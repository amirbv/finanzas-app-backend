const { authJwt } = require("../../middleware");
const controller = require("../../controllers/banks.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Retrieve all banks
  app.get("/api/banks/", [authJwt.verifyToken], controller.findAllBanks);

  app.get(
    "/api/walletsDependencies/",
    [authJwt.verifyToken],
    controller.findWalletDependencies
  );

  //Retrieve a bank
  app.get(
    "/api/bank/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findOneBank
  );

  //Create a bank
  app.post(
    "/api/bank/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createBank
  );

  //Update a bank
  app.put(
    "/api/bank/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateBank
  );

  //Delete a bank
  app.delete(
    "/api/bank/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteBank
  );
};
