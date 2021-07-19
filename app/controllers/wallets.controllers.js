const db = require("../models");
const Users = db.user;
const Banks = db.banks;
const Wallets = db.wallets;

//Create and save new Wallets
  exports.createWallet = (req, res) => {
    return Wallets.create({
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount,
        isActive: req.body.isActive,
        bankIDBank: req.body.bankIDBank,
        userIDUsers: req.body.userIDUsers
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err => {
        res.status(500).send({
            message:
              err.message || "Ocurrio un error al crear la cartera"});  
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
    const IDUser = req.params.id;

    Wallets.findAll({where: {userIDUsers: IDUser}, attributes: show, include: requierements})
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
  const IDWallet = req.params.id;

    Wallets.findByPk(IDWallet, {attributes: show, include: requierements})
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

    Wallets.update(req.body, {
      where: {IDWallets:IDWallet}
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

  //Delete Wallet
  exports.deleteWallet = (req, res) => {
    const IDWallet = req.params.id;

    Wallets.destroy({
      where: {IDWallets: IDWallet}
    }).then(result => {
      if (result == 1) {
        res.send({
          message: "Cartera borrada exitosamente."
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
    }
  ];