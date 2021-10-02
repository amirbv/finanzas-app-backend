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
                conversionAmount = amount
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
      const IDWallet = req.params.idWallet;
      let token = req.headers['x-access-token']
      let dtoken = jwt.verify(token, config.secret);
      Movements.findAll({where: {walletIDWallets: IDWallet, userIDUsers: dtoken.id}, attributes: show, include: requierements})
      .then((data) => {
        if(data.length === 0){
          res.status(404).send({
            message: "Movimientos no encontrados"
          })
        }

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

      try {
        let movement = await Movement.findOne({where: {IDMovements: IDMovement, userIDUsers: dtoken.id}, attributes: show, include: requierements})
        let wallet = await Wallets.findOne({where: {userIDUsers: dtoken.id, Wallet}})
      } catch (error) {
        res.status(500).send(error)
      }

    })()
  };


  //Delete Movement
  exports.deleteMovement = (req, res) => {
    (async = () =>{

    })()
  };

  let show = [
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