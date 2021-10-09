const fetch = require('node-fetch');
const db = require("../models/index.js");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const Options = db.options;
const Users = db.user;
const MovementType = db.movementType;
const Wallets = db.wallets;
const ConversionRates = db.conversionRate;
const Movements = db.movements;
const url = 'https://s3.amazonaws.com/dolartoday/data.json';


// let token = req.headers['x-access-token']
// let dtoken = jwt.verify(token, config.secret);

//Create and save new Movement
  exports.createMovement = (req, res) => {
    (async () => {
      let token = req.headers['x-access-token']
      let dtoken = jwt.verify(token, config.secret);
      await fetch(url)
          .then((response) => response.json())
          .then((data) => {
              let IDWallet = req.params.idWallet;
              let EUR = data.EUR.promedio;
              let USD = data.USD.promedio;

              let option = req.body.optionIDOptions;
              let amount = req.body.amount;
              if(option == 2){
                amount *= -1; 
              }
          
              let conversionRate = req.body.conversionRateIDConversionRate;
              let conversionByUser = req.body.conversionByUser;
              let conversionAmount;
              if(conversionRate == 1){
                conversionAmount = 0
              }else if(conversionRate == 2){
                conversionAmount = amount / USD;
              }else if((conversionRate == 3) || (conversionRate == 5)){
                conversionAmount = amount / EUR;
              }else if(conversionRate == 4){
                conversionAmount = amount * USD;
              }else if((conversionRate == 6) || (conversionRate == 7)){
                conversionAmount = amount * EUR;
              }else if(conversionRate == 8){
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
                    conversionRateIDConversionRate: req.body.conversionRateIDConversionRate,
                    conversionAmount: conversionAmount
                });

                if(movement){
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
                      ((parseFloat(wallet.amount)) + (parseFloat(results[0].suma)));
        
                    await Wallets.update(
                      { amount: amountWallet },
                      { where: { IDWallets: IDWallet, userIDUsers: dtoken.id  } }
                    );
                    return res.status(200).send({
                      message: "Movimiento creado con exito"
                    });
                    
                  } catch (error) {
                    console.log(error)
                  }
                }else{
                    return res.status(500).send({
                      message: "Error en el servidor"
                    })
                }

                } catch (error) {
                  console.log(error)
                  return res.status(500).send({
                    message: "Error en el servidor"
                  })
                }

              })();

          });


    })();
    
  };

  //Find all movements
  exports.findAllMovements = (req, res) => {
    Movements.findAll({attributes: show, include: requierements})
      .then((data) => {
        if(data){
          res.status(200).send(data);
        }else{
          res.send({message: "Movimientos no encontrados"});
        }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al mostrar los movimientos"});
      });
  };

  //find movements by wallet
  exports.findAllMovementsByWallets = (req, res) => {
    try {
      const IDWallet = req.params.id;
      console.log(IDWallet)
      let token = req.headers['x-access-token']
      let dtoken = jwt.verify(token, config.secret);
      Movements.findAll({where: {walletIDWallets: IDWallet, userIDUsers: dtoken.id}, attributes: show, include: [
        {
          model: Options,
          as: "Options"
        },

        {
          model: Wallets,
          as: "Wallets"
        }
      ]})
      .then((data) => {
        if(data){
          res.status(200).send(data);
        }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al mostrar los movimientos"});
      });
    } catch (error) {
      
    }
    
  }

  //Find a movement
  exports.findOneMovement = (req, res) => {
  const IDMovement = req.params.idMovement;
  const IDWallet = req.params.idWallet;
  let token = req.headers['x-access-token']
  let dtoken = jwt.verify(token, config.secret);
    Movements.findOne({where: {walletIDWallets: IDWallet, IDMovements: IDMovement, userIDUsers: dtoken.id}, attributes: show, include: requierements})
      .then((data) => {
        if(data){
          res.status(200).send(data);
        }else{
          res.send({message: "Movimiento no encontrado"});
        }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al mostrar el movimiento"});
      });
  };


  // Update movemement
  exports.updateMovement = (req, res) => {
    (async () => {

      const IDMovement = req.params.idMovement;
      let token = req.headers['x-access-token']
      let dtoken = jwt.verify(token, config.secret);
      let conversion, title, description, optionIDOptions, movementTypeIDMovementType, amount, conversionAmount, movement, wallet;

      try {
        let findMovement = await db.sequelize.query(`
        SELECT * FROM movements WHERE IDMovements = ${IDMovement}
      `, { type: db.sequelize.QueryTypes.SELECT });
       
        let findWallet = await db.sequelize.query(`
        SELECT * FROM wallets WHERE IDMovements = ${IDMovement}
      `, { type: db.sequelize.QueryTypes.SELECT });

      req.body.title === findWallet.name ? name = findWallet.name : name = req.body.name;
      req.body.description === findWallet.description ? description = findWallet.description : description = req.body.description;
      req.body.amount === findWallet.amount ? amount = findWallet.amount : amount = req.body.amount;
      req.body.optionIDOptions === findWallet.bankIDBank ? bank = findWallet.bankIDBank : bankIDBank = req.body.bankIDBank;
      req.body.currencyTypeIDCurrencyType === findWallet.currencyTypeIDCurrencyType ? currencyTypeIDCurrencyType = findWallet.currencyTypeIDCurrencyType : currencyTypeIDCurrencyType = req.body.currencyTypeIDCurrencyType;


    } catch (error) {
        res.status(500).send(error)
      }

    })()
  };

  //Movements Dependencies
  exports.movementsDependencies = async(req, res) => {
    let options = await Options.findAll();
    let movementType = await MovementType.findAll();
    let conversionRate = await ConversionRates.findAll();
    try {
      res.status(200).send({options, movementType, conversionRate});
    } catch (error) {
      res.status(500).send({
        message: error.message
      })
    }
  }


  //Delete Movement
  exports.deleteMovement = async(req, res) => {
      const IDMovement = req.params.idMovement;
      let token = req.headers['x-access-token']
      let dtoken = jwt.verify(token, config.secret);
      let result;

        let findMovement = await db.sequelize.query(`
        SELECT * FROM movements WHERE IDMovements = ${IDMovement} AND userIDUsers = ${dtoken.id}
      `, { type: db.sequelize.QueryTypes.SELECT });

        let findWallet = await db.sequelize.query(`
        SELECT * FROM wallets WHERE IDWallets = ${findMovement[0].walletIDWallets} AND userIDUsers = ${dtoken.id}
        `, { type: db.sequelize.QueryTypes.SELECT });

        
        if(findMovement[0].optionIDOptions == 1){
          try {            
              result = findWallet[0].amount - findMovement[0].amount
              console.log(findMovement[0])
              await db.sequelize.query(`
              UPDATE wallets SET amount=${result} WHERE wallets.IDWallets = ${findMovement[0].walletIDWallets} AND wallets.userIDUsers = ${dtoken.id}
              `, { type: db.sequelize.QueryTypes.UPDATE });
              

              await db.sequelize.query(`
                DELETE FROM movements WHERE movements.walletIDWallets = ${findMovement[0].walletIDWallets} AND movements.userIDUsers = ${dtoken.id} AND IDMovements = ${IDMovement}
              `, { type: db.sequelize.QueryTypes.DELETE });
              res.status(200).send({
                message: "Movimiento eliminado con exito"
              });                 
         
          } catch (error) {
            res.status(500).send({
              message: error
            })
          }

        }

        if(findMovement[0].optionIDOptions == 2){
          try {
            let result = findWallet[0].amount + findMovement[0].amount
            console.log(result)
            db.sequelize.query(`
              UPDATE wallets SET amount=${result} WHERE wallets.IDWallets = ${findMovement[0].walletIDWallets} AND wallets.userIDUsers = ${dtoken.id}
            `, { type: db.sequelize.QueryTypes.UPDATE });
            
            await db.sequelize.query(`
              DELETE FROM movements WHERE movements.walletIDWallets = ${findMovement[0].walletIDWallets} AND movements.userIDUsers = ${dtoken.id} AND IDMovements = ${IDMovement}
            `, { type: db.sequelize.QueryTypes.DELETE });  
            res.status(200).send({
              message: "Movimiento eliminado con exito"
            });
          } catch (error) {
            res.status(500).send({
              message: error
            })
          }
          
        }       


  };

  let show = [
    "IDMovements",
    "title",
    "description",
    "amount",
    "date",
    "conversionAmount"
  ];

  let requierements = [
    
    {
      model: Options,
      as: "Options"
    },

    {
      model: MovementType,
      as: "MovementTypes"
    },

    {
      model: Wallets,
      as: "Wallets"
    },

    {
      model: ConversionRates,
      as: "ConversionRates"

    },

    {
      model: Users,
      as:"User"
    }
  ];