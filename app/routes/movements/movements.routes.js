const { authJwt } = require("../../middleware");
const controller = require("../../controllers/movements.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //create a movement
  app.post(    
    "/api/movement/:idWallet",
    [authJwt.verifyToken, authJwt.userIsBlocked],
    controller.createMovement
  );

  //Retrieve a movement
  app.get(
    "/api/movements/:idMovement",
    [authJwt.verifyToken, authJwt.userIsBlocked],
    controller.findOneMovement
  );
  
  //Retrieve all movements
  app.get(
    "/api/movements/",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.userIsBlocked],
    controller.findAllMovements
  );

  //Retrieve a movement by wallets
  app.get(
    "/api/movements/:idWallet",
    [authJwt.verifyToken, authJwt.userIsBlocked],
    controller.findAllMovementsByWallets
  );

  //Update a movement
  app.put(
    "/api/movement/update/:idMovement",
    [authJwt.verifyToken, authJwt.userIsBlocked],
    controller.updateMovement
  );

  //Delete a movement
  app.delete(
    "/api/movement/delete/:idWallet/:idMovement",
    [authJwt.verifyToken, authJwt.userIsBlocked],
    controller.deleteMovement
  );
};