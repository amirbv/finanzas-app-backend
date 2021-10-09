const { authJwt } = require("../../middleware");
const controller = require("../../controllers/wallets.controllers");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //create a wallet
  app.post(    
    "/api/wallets/",
    [authJwt.verifyToken],
    controller.createWallet
  );

  //Retrieve a wallet
  app.get(
    "/api/wallets/:idWallet",
    [authJwt.verifyToken],
    controller.findOneWallet
  );
  
  //Retrieve all wallets
  app.get(
    "/api/wallets/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAllWallets
  );

  //Retrieve a wallet by user
  app.get(
    "/api/walletsByUser/",
    [authJwt.verifyToken],
    controller.findAllWalletsByUsers
  );

  //Update a Wallet
  app.put(
    "/api/wallets/:id",
    [authJwt.verifyToken],
    controller.updateWallet
  );

  //Delete a wallet
  app.delete(
    "/api/wallets/:id",
    [authJwt.verifyToken],
    controller.deleteWallet
  );
};