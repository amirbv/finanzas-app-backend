const { wallets } = require("../models/index.js");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models/index.js");
const Users = db.user;
const Banks = db.banks;
const Wallets = db.wallets;
const CurrencyTypes = db.currencyType;
const Movements = db.movements;

//Create and save new Wallets
  exports.createWallet = (req, res) => {
    let token = req.headers['x-access-token']
    let dtoken = jwt.verify(token, config.secret);
    return Wallets.create({
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount,
        bankIDBank: req.body.bankIDBank,
        currencyTypeIDCurrencyType: req.body.currencyTypeIDCurrencyType,
        userIDUsers: dtoken.id
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err => {
        res.status(500).send({
            message:
              err.message || "Ocurrio un error al crear la cartera."});  
      }));
  };

  //Find all wallets
  exports.findAllWallets = (req, res) => {
    Wallets.findAll({attributes: show, include: requierements}).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al mostrar las carteras"});
    });
  };

  //find wallets by user
  exports.findAllWalletsByUsers = (req, res) => {
    let token = req.headers['x-access-token']
    let dtoken = jwt.verify(token, config.secret);

    Wallets.findAll({where: {userIDUsers: dtoken.id}, attributes: show, include: requierements})
      .then((data) => {
        if(data){
          res.status(200).send(data);
        }else{
          res.status(404).send({message: "Carteras no encontradas"});
        }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al mostrar el usuario"});
      });
  }

  //Find a wallet
  exports.findOneWallet = (req, res) => {
  const IDWallet = req.params.idWallet;
  let token = req.headers['x-access-token']
  let dtoken = jwt.verify(token, config.secret);
  
    Wallets.findOne({where: {IDWallets: IDWallet, userIDUsers: dtoken.id}, attributes: show, include: requierements})
      .then((data) => {
        if(data){
          res.status(200).send(data);
        }else{
          res.status(404).send({message: "Cartera no encontrada"});
        }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al mostrar el monedero"});
      });
  };

  
  exports.updateWallet = (req, res) => {
    (async () => {
      const IDWallet = req.params.id;
      let token = req.headers['x-access-token']
      let dtoken = jwt.verify(token, config.secret);
      let name, description, amount, bankIDBank, currencyTypeIDCurrencyType;

      try {
        let findWallet = await db.sequelize.query(`
        SELECT name, description, amount, bankIDBank, currencyTypeIDCurrencyType FROM wallets WHERE wallets.IDWallets = ${IDWallet} AND wallets.userIDUsers = ${dtoken.id}
      `, { type: db.sequelize.QueryTypes.SELECT }); 

        req.body.name === findWallet[0].name ? name = findWallet[0].name : name = req.body.name;
        req.body.description === findWallet[0].description ? description = findWallet[0].description : description = req.body.description;
        req.body.amount === findWallet[0].amount ? amount = findWallet[0].amount : amount = req.body.amount;
        req.body.bankIDBank === findWallet[0].bankIDBank ? bank = findWallet[0].bankIDBank : bankIDBank = req.body.bankIDBank;
        req.body.currencyTypeIDCurrencyType === findWallet[0].currencyTypeIDCurrencyType ? currencyTypeIDCurrencyType = findWallet[0].currencyTypeIDCurrencyType : currencyTypeIDCurrencyType = req.body.currencyTypeIDCurrencyType;

        if(req.body.name === "" || req.body.description === "" || req.body.amount === "" || req.body.bankIDBank === "" || req.body.currencyTypeIDCurrencyType === ""){
          name = "";
          description = "";
          amount="";
          bankIDBank="";
          currencyTypeIDCurrencyType="";
          res.status(400).send({
            message: "Error. Campos vacios"
          })
        }else{
          try {
            await db.sequelize.query(`
            UPDATE wallets SET name = "${name}", description="${description}", amount=${amount}, bankIDBank=${bankIDBank}, currencyTypeIDCurrencyType=${currencyTypeIDCurrencyType} WHERE wallets.IDWallets = ${IDWallet} AND wallets.userIDUsers = ${dtoken.id}
            `, { type: db.sequelize.QueryTypes.UPDATE });
  
            try {
              
              if(amount > findWallet[0].amount){
                try {
                  let result = amount - findWallet[0].amount
                  await db.sequelize.query(`
                    INSERT INTO movements(userIDUsers, title, optionIDOptions, movementTypeIDMovementType, amount, date, walletIDWallets, conversionRateIDConversionRate, conversionAmount) VALUES (${dtoken.id},"Monto de modenero modificado",1,10,${result}, NOW(),${IDWallet},1,${result})
                `, { type: db.sequelize.QueryTypes.INSERT });      
                  res.status(200).send({message: "Monedero actualizado con eso"})
                
                } catch (error) {
                  console.log(error)
                  res.status(500).send({message: error})
                }
              }
        
              if(amount < findWallet[0].amount){
                try {
                  let result = amount - findWallet[0].amount
                  await db.sequelize.query(`
                    INSERT INTO movements(userIDUsers, title, optionIDOptions, movementTypeIDMovementType, amount, date, walletIDWallets, conversionRateIDConversionRate, conversionAmount) VALUES (${dtoken.id},"Monto de modenero modificado",2,11,${result}, NOW(),${IDWallet},1,${result})
                `, { type: db.sequelize.QueryTypes.INSERT });      
                  res.status(200).send({message: "Monedero actualizado con eso"})
                
                } catch (error) {
                  console.log(error)
                  res.status(500).send({message: error})
                }
              }  
  
              if (amount === findWallet[0].amount)
                res.status(200).send({message: "Monedero actualizado con eso"})
  
              } catch (error) {
                console.log(error)
                res.status(500).send({message: error})
              }  
  
            } catch (error) {
              console.log(error)
              res.status(500).send({message: error})
            }  
        }
        
        } catch (error) {
          console.log(error)
          res.status(500).send({message: error})
        }

    })()
  };

  //Delete Wallet DELETE FROM `movements` WHERE `walletIDWallets` = ${WalletID}
  exports.deleteWallet = (req, res) => {
    (async () => {

      const idw = req.params.id;
      let token = req.headers['x-access-token']
      let dtoken = jwt.verify(token, config.secret);

      try {
        let wallet = await Wallets.destroy({where: {IDWallets: idw, userIDUsers: dtoken.id}})
        if(wallet){
          let movWallet = await db.sequelize.query(`DELETE FROM movements WHERE walletIDWallets = ${idw} AND userIDUsers=${dtoken.id}`, { type: db.sequelize.QueryTypes.DELETE });
          if(movWallet){
            res.status(200).send({message: "Monedero Borrado Exitosamente"})
          }
            res.status(200).send({message: "Monedero Borrado Exitosamente"})
        }
      } catch (error) {
        console.log(error)
        res.status(500).send({message: error})          
      }


    })()
  };

  let show = [
    "IDWallets",
    "name",
    "description",
    "amount"
  ];

  let requierements = [
    {
      model: Banks,
      as: "Banks"
    },
        
    {
      model: Users,
      as: "User"
    },

    {
      model: CurrencyTypes,
      as: "CurrencyType"
    }
  ];