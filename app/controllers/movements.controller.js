const fetch = require("node-fetch");
const db = require("../models/index.js");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const Options = db.options;
const Users = db.user;
const MovementType = db.movementType;
const Wallets = db.wallets;
const ConversionRates = db.conversionRate;
const Movements = db.movements;
const url = "https://s3.amazonaws.com/dolartoday/data.json";

// let token = req.headers['x-access-token']
// let dtoken = jwt.verify(token, config.secret);

//Create and save new Movement
exports.createMovement = (req, res) => {
  (async () => {
    let token = req.headers["x-access-token"];
    let dtoken = jwt.verify(token, config.secret);
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let IDWallet = req.params.idWallet;
        let EUR = data.EUR.promedio;
        let USD = data.USD.promedio;

        let option = req.body.optionIDOptions;
        let amount = req.body.amount;
        if (option == 2) {
          amount *= -1;
        }

        let conversionRate = req.body.conversionRateIDConversionRate;
        let conversionByUser = req.body.conversionByUser;
        let conversionAmount;
        if (conversionRate == 1) {
          conversionAmount = 0;
        } else if (conversionRate == 2) {
          conversionAmount = amount / USD;
        } else if (conversionRate == 3 || conversionRate == 5) {
          conversionAmount = amount / EUR;
        } else if (conversionRate == 4) {
          conversionAmount = amount * USD;
        } else if (conversionRate == 6 || conversionRate == 7) {
          conversionAmount = amount * EUR;
        } else if (conversionRate == 8) {
          conversionAmount = amount * conversionByUser;
        }
        (async () => {
          try {
            let movement = await Movements.create({
              optionIDOptions: option,
              userIDUsers: dtoken.id,
              title: req.body.title,
              description: req.body.description,
              movementTypeIDMovementType: req.body.movementTypeIDMovementType,
              amount: amount,
              walletIDWallets: req.params.idWallet,
              conversionRateIDConversionRate:
                req.body.conversionRateIDConversionRate,
              conversionAmount: conversionAmount,
            });

            if (movement) {
              try {
                let wallet = await Wallets.findOne(
                  { where: { IDWallets: IDWallet, userIDUsers: dtoken.id } },
                  { attributes: "amount" }
                );
                let results = await db.sequelize.query(
                  `SELECT movements.amount as suma FROM movements INNER JOIN wallets WHERE wallets.IDWallets = ${IDWallet} AND movements.IDMovements = ${movement._previousDataValues.IDMovements}`,
                  { type: db.sequelize.QueryTypes.SELECT }
                );

                let amountWallet =
                  parseFloat(wallet.amount) + parseFloat(results[0].suma);

                await Wallets.update(
                  { amount: amountWallet },
                  { where: { IDWallets: IDWallet, userIDUsers: dtoken.id } }
                );
                return res.status(200).send({
                  message: "Movimiento creado con exito",
                });
              } catch (error) {
                console.log(error);
              }
            } else {
              return res.status(500).send({
                message: "Error en el servidor",
              });
            }
          } catch (error) {
            console.log(error);
            return res.status(500).send({
              message: "Error en el servidor",
            });
          }
        })();
      });
  })();
};

//Find all movements
exports.findAllMovements = (req, res) => {
  Movements.findAll({ attributes: show, include: requierements })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.send({ message: "Movimientos no encontrados" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al mostrar los movimientos",
      });
    });
};

//find movements by wallet
exports.findAllMovementsByWallets = (req, res) => {
  try {
    const IDWallet = req.params.id;
    let token = req.headers["x-access-token"];
    let dtoken = jwt.verify(token, config.secret);
    Movements.findAll(
      {
        order: [['date', 'DESC']],
        where: { walletIDWallets: IDWallet, userIDUsers: dtoken.id },
        attributes: show,
        include: [
          {
            model: Options,
            as: "Options",
          },

          {
            model: Wallets,
            as: "Wallets",
          },
        ],
      }
    )
      .then((data) => {
        if (data) {
          res.status(200).send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Ocurrio un error al mostrar los movimientos",
        });
      });
  } catch (error) {}
};

//Find a movement
exports.findOneMovement = (req, res) => {
  const IDMovement = req.params.idMovement;

  let token = req.headers["x-access-token"];
  let dtoken = jwt.verify(token, config.secret);
  Movements.findOne({
    where: { IDMovements: IDMovement, userIDUsers: dtoken.id },
    attributes: show,
    include: requierements,
  })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.send({ message: "Movimiento no encontrado" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al mostrar el movimiento",
      });
    });
};

// Update movemement
exports.updateMovement = (req, res) => {
  (async () => {
    const IDMovement = req.params.idMovement;
    let token = req.headers["x-access-token"];
    let dtoken = jwt.verify(token, config.secret);
    let sumAmount,
      amountNegative,
      conversion,
      title,
      description,
      optionIDOptions,
      movementTypeIDMovementType,
      amount,
      newAmount;

    try {
      let findMovement = await db.sequelize.query(
        `
        SELECT * FROM movements WHERE IDMovements = ${IDMovement}
      `,
        { type: db.sequelize.QueryTypes.SELECT }
      );

      let findWallet = await db.sequelize.query(
        `
        SELECT * FROM wallets WHERE IDWallets = ${findMovement[0].walletIDWallets}
      `,
        { type: db.sequelize.QueryTypes.SELECT }
      );

      req.body.title === findMovement[0].title
        ? (title = findMovement[0].title)
        : (title = req.body.title);

      req.body.description === findMovement[0].description
        ? (description = findMovement[0].description)
        : (description = req.body.description);

      req.body.optionIDOptions === findMovement[0].optionIDOptions
        ? (optionIDOptions = findMovement[0].optionIDOptions)
        : (optionIDOptions = req.body.optionIDOptions);

      req.body.movementTypeIDMovementType ===
      findMovement[0].movementTypeIDMovementType
        ? (movementTypeIDMovementType =
            findMovement[0].movementTypeIDMovementType)
        : (movementTypeIDMovementType = req.body.movementTypeIDMovementType);
    
      req.body.amount === findMovement[0].amount
        ? (amount = findMovement[0].amount)
        : (amount = req.body.amount);

        if (
          findMovement[0].conversionRateIDConversionRate == 1
        ){
          newAmount = amount
        }

      if (
        findMovement[0].conversionRateIDConversionRate == 2 ||
        findMovement[0].conversionRateIDConversionRate == 3 ||
        findMovement[0].conversionRateIDConversionRate == 5
      ) {
        conversion = findMovement[0].amount / findMovement[0].conversionAmount;
        newAmount = amount / conversion;
      }

      if (
        findMovement[0].conversionRateIDConversionRate == 4 ||
        findMovement[0].conversionRateIDConversionRate == 6 ||
        findMovement[0].conversionRateIDConversionRate == 7
      ) {
        conversion = findMovement[0].conversionAmount / findMovement[0].amount;
        newAmount = amount * conversion;
      }

      if (optionIDOptions == 1) {
        if(amount < 0){
          amount = amount * -1;
        }
        try {
          await db.sequelize.query(
            `
            UPDATE movements SET title='${title}',description='${description}',optionIDOptions=${optionIDOptions},movementTypeIDMovementType=${movementTypeIDMovementType},amount=${amount},conversionAmount=${newAmount} WHERE movements.IDMovements = ${IDMovement} AND movements.walletIDWallets = ${findMovement[0].walletIDWallets} AND movements.userIDUsers = ${dtoken.id}
            `,
            { type: db.sequelize.QueryTypes.UPDATE }
          );

          try {
            sumAmount = await db.sequelize.query(
              `
              SELECT SUM(amount) as suma FROM movements WHERE movements.walletIDWallets = ${findMovement[0].walletIDWallets} AND movements.userIDUsers = ${dtoken.id};
              `,
              { type: db.sequelize.QueryTypes.SELECT }
            );

            try {
              await db.sequelize.query(
                `
                UPDATE wallets SET amount=${sumAmount[0].suma} WHERE wallets.IDWallets = ${findMovement[0].walletIDWallets} AND wallets.userIDUsers = ${dtoken.id}
                `,
                { type: db.sequelize.QueryTypes.UPDATE }
              );

              res.status(200).send({
                message: "Movimiento actualizado con exito",
              });
            } catch (error) {
              res.status(500).send({
                message: error,
              });
            }
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          res.status(500).send({
            message: error,
          });
        }
      }

      if (optionIDOptions == 2) {
        if (amount > 0) {
          amountNegative = amount * -1;
          try {
            await db.sequelize.query(
              `
              UPDATE movements SET title='${title}',description='${description}',optionIDOptions=${optionIDOptions},movementTypeIDMovementType=${movementTypeIDMovementType},amount=${amountNegative},conversionAmount=${newAmount} WHERE movements.IDMovements = ${IDMovement} AND movements.walletIDWallets = ${findMovement[0].walletIDWallets} AND movements.userIDUsers = ${dtoken.id}
              `,
              { type: db.sequelize.QueryTypes.UPDATE }
            );

            try {
              sumAmount = await db.sequelize.query(
                `
                SELECT SUM(amount) as suma FROM movements WHERE movements.walletIDWallets = ${findMovement[0].walletIDWallets} AND movements.userIDUsers = ${dtoken.id};
                `,
                { type: db.sequelize.QueryTypes.SELECT }
              );

              try {
                await db.sequelize.query(
                  `
                  UPDATE wallets SET amount=${sumAmount[0].suma} WHERE wallets.IDWallets = ${findMovement[0].walletIDWallets} AND wallets.userIDUsers = ${dtoken.id}
                  `,
                  { type: db.sequelize.QueryTypes.UPDATE }
                );

                res.status(200).send({
                  message: "Movimiento actualizado con exito",
                });
              } catch (error) {
                res.status(500).send({
                  message: error,
                });
              }
            } catch (error) {
              console.log(error);
            }
          } catch (error) {
            res.status(500).send({
              message: error,
            });
          }
        }

        if (amount <= 0) {
          amount = Number.parseFloat(amount)
          try {
            await db.sequelize.query(
              `
              UPDATE movements SET title='${title}',description='${description}',optionIDOptions=${optionIDOptions},movementTypeIDMovementType=${movementTypeIDMovementType},amount=${amount},conversionAmount=${newAmount} WHERE movements.IDMovements = ${IDMovement} AND movements.walletIDWallets = ${findMovement[0].walletIDWallets} AND movements.userIDUsers = ${dtoken.id}
              `,
              { type: db.sequelize.QueryTypes.UPDATE }
            );

            try {
              sumAmount = await db.sequelize.query(
                `
                SELECT SUM(amount) as suma FROM movements WHERE movements.walletIDWallets = ${findMovement[0].walletIDWallets} AND movements.userIDUsers = ${dtoken.id};
                `,
                { type: db.sequelize.QueryTypes.SELECT }
              );

              try {
                await db.sequelize.query(
                  `
                  UPDATE wallets SET amount=${sumAmount[0].suma} WHERE wallets.IDWallets = ${findMovement[0].walletIDWallets} AND wallets.userIDUsers = ${dtoken.id}
                  `,
                  { type: db.sequelize.QueryTypes.UPDATE }
                );

                res.status(200).send({
                  message: "Movimiento actualizado con exito",
                });
              } catch (error) {
                res.status(500).send({
                  message: error,
                });
              }
            } catch (error) {
              console.log(error);
            }
          } catch (error) {
            res.status(500).send({
              message: error,
            });
          }
        }
      }
    } catch (error) {
      res.status(500).send(error);
    }
  })();
};

//Movements Dependencies
exports.movementsDependencies = async (req, res) => {
  let options = await Options.findAll();
  let movementType = await MovementType.findAll();
  let conversionRate = await ConversionRates.findAll();
  try {
    res.status(200).send({ options, movementType, conversionRate });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

//Delete Movement
exports.deleteMovement = async (req, res) => {
  const IDMovement = req.params.idMovement;
  let token = req.headers["x-access-token"];
  let dtoken = jwt.verify(token, config.secret);
  let result;

  let findMovement = await db.sequelize.query(
    `
        SELECT * FROM movements WHERE IDMovements = ${IDMovement} AND userIDUsers = ${dtoken.id}
      `,
    { type: db.sequelize.QueryTypes.SELECT }
  );

  let findWallet = await db.sequelize.query(
    `
        SELECT * FROM wallets WHERE IDWallets = ${findMovement[0].walletIDWallets} AND userIDUsers = ${dtoken.id}
        `,
    { type: db.sequelize.QueryTypes.SELECT }
  );

  if (findMovement[0].optionIDOptions == 1) {
    try {
      result = findWallet[0].amount - findMovement[0].amount;
      await db.sequelize.query(
        `
              UPDATE wallets SET amount=${result} WHERE wallets.IDWallets = ${findMovement[0].walletIDWallets} AND wallets.userIDUsers = ${dtoken.id}
              `,
        { type: db.sequelize.QueryTypes.UPDATE }
      );

      await db.sequelize.query(
        `
                DELETE FROM movements WHERE movements.walletIDWallets = ${findMovement[0].walletIDWallets} AND movements.userIDUsers = ${dtoken.id} AND IDMovements = ${IDMovement}
              `,
        { type: db.sequelize.QueryTypes.DELETE }
      );
      res.status(200).send({
        message: "Movimiento eliminado con exito",
      });
    } catch (error) {
      res.status(500).send({
        message: error,
      });
    }
  }

  if (findMovement[0].optionIDOptions == 2) {
    try {
      let result = findWallet[0].amount + findMovement[0].amount;

      db.sequelize.query(
        `
              UPDATE wallets SET amount=${result} WHERE wallets.IDWallets = ${findMovement[0].walletIDWallets} AND wallets.userIDUsers = ${dtoken.id}
            `,
        { type: db.sequelize.QueryTypes.UPDATE }
      );

      await db.sequelize.query(
        `
              DELETE FROM movements WHERE movements.walletIDWallets = ${findMovement[0].walletIDWallets} AND movements.userIDUsers = ${dtoken.id} AND IDMovements = ${IDMovement}
            `,
        { type: db.sequelize.QueryTypes.DELETE }
      );
      res.status(200).send({
        message: "Movimiento eliminado con exito",
      });
    } catch (error) {
      res.status(500).send({
        message: error,
      });
    }
  }
};

let show = [
  "IDMovements",
  "title",
  "description",
  "amount",
  "date",
  "conversionAmount",
];

let requierements = [
  {
    model: Options,
    as: "Options",
  },

  {
    model: MovementType,
    as: "MovementTypes",
  },

  {
    model: Wallets,
    as: "Wallets",
  },

  {
    model: ConversionRates,
    as: "ConversionRates",
  },

  {
    model: Users,
    as: "User",
  },
];
