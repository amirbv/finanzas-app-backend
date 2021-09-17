const fetch = require('node-fetch');
const db = require("../models/index.js");
const Options = db.options;
const MovementType = db.movementType;
const Wallets = db.wallets;
const ConversionRates = db.conversionRate;
const Movements = db.movements;
const url = 'https://s3.amazonaws.com/dolartoday/data.json';

//Create and save new Movement
  exports.createMovement = (req, res) => {
    (async () => {
      await fetch(url)
          .then((response) => response.json())
          .then((data) => {
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
          
              return Movements.create({
                  optionIDOptions: option,
                  movementTypeIDMovementType: req.body.movementTypeIDMovementType,
                  amount: amount,
                  walletIDWallets: req.params.idWallet,
                  conversionRateIDConversionRate: req.body.conversionRateIDConversionRate,
                  conversionAmount: conversionAmount
              })
                .then((data) => {
                  res.status(200).send(data);
                })
                .catch((err => {
                  res.status(500).send({
                      message:
                        err.message || "Ocurrio un error al crear el movimiento"});  
                }));
          });
    })();
    
  };

  //Find all movements
  exports.findAllMovements = (req, res) => {
    Movements.findAll({attributes: show, include: requierements}).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al mostrar los movimientos"});
    });
  };

  //find movements by wallet
  exports.findAllMovementsByWallets = (req, res) => {
    const IDWallet = req.params.id;

    Movements.findAll({where: {walletIDWallets: IDWallet}, attributes: show, include: requierements})
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
  }

  //Find a movement
  exports.findOneMovement = (req, res) => {
  const IDMovement = req.params.id;

    Movements.findByPk(IDMovement, {attributes: show, include: requierements})
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

  // Update moveement
  exports.updateMovement = (req, res) => {
    const IDMovement = req.params.idMovement;

    Movements.update(req.body, {
      where: {IDMovements:IDMovement}
    }).then(result => {
      if (result == 1) {
        res.send({
          message: "Movimiento actualizado."
        });
      } else {
        res.send({
          message: `No se pudo actualizar el movimiento con id=${id}. Quizas no existe o el req.body esta vacio`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
  };

  //Update amount in wallet
  exports.updateAmountWallet = (req, res) => {
    const IDMovement = req.params.id;

    Movements.update(req.body, {
      where: {IDMovements:IDMovement}
    }).then(result => {
      if (result == 1) {
        res.send({
          message: "Movimiento actualizado."
        });
      } else {
        res.send({
          message: `No se pudo actualizar el movimiento con id=${id}. Quizas no existe o el req.body esta vacio`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
  };

  //Delete Movement
  exports.deleteMovement = (req, res) => {
    const IDMovement = req.params.id;

    Movements.destroy({
      where: {IDMovements: IDMovement}
    }).then(result => {
      if (result == 1) {
        res.send({
          message: "Movimiento borrado exitosamente."
        });
      } else {
        res.send({
          message: `No se pudo borrar id=${id}. Quizas no existe.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
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

    }
  ];