const { wallets } = require("../models/index.js");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models/index.js");
const Users = db.user;
const Banks = db.banks;
const Wallets = db.wallets;
const CurrencyTypes = db.currencyType;

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
          res.send({message: "Carteras no encontradas"});
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
          res.send({message: "Cartera no encontrada"});
        }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al mostrar el usuario"});
      });
  };

  
  exports.updateWallet = (req, res) => {
    const IDWallet = req.params.id;
    let token = req.headers['x-access-token']
    let dtoken = jwt.verify(token, config.secret);

    Wallets.update(req.body, {
      where: {IDWallets:IDWallet,
              userIDUsers: dtoken.id}
    }).then(result => {
      if (result == 1) {
        res.send({
          message: "Cartera actualizada."
        });
      } else {
        res.send({
          message: `No se pudo actualizar id=${id}. Quizas no existe o el req.body esta vacio`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
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
          let movWallet = await sequelize.query(`DELETE FROM movements WHERE walletIDWallets = ${idw} AND userIDUsers=${dtoken.id}`, { type: QueryTypes.DELETE });
          if(movWallet){
            res.status(200).send({message: "Monedero Borrado Exitosamente"})
          }
            res.status(200).send({message: "Monedero Borrado Exitosamente"})
          
        }

      } catch (error) {
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