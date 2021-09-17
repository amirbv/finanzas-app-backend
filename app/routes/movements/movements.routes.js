const { authJwt } = require("../../middleware");
const controller = require("../../controllers/movements.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //create a movement
  app.post(    
    "/api/movement/:idWallet",
    [authJwt.verifyToken],
    controller.createMovement
  );

  //Retrieve a movement
  app.get(
    "/api/movements/:idWallet/:idMovement",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findOneMovement
  );
  
  //Retrieve all movements
  app.get(
    "/api/movements/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAllMovements
  );

  //Retrieve a movement by wallets
  app.get(
    "/api/movements/:idWallet",
    [authJwt.verifyToken],
    controller.findAllMovementsByWallets
  );

  //Update a movement
  app.put(
    "/api/movement/update/:idWallet/:idMovement",
    [authJwt.verifyToken],
    controller.updateMovement
  );

  //Delete a movement
  app.delete(
    "/api/movement/delete/:idWallet/:idMovement",
    [authJwt.verifyToken],
    controller.deleteMovement
  );
};