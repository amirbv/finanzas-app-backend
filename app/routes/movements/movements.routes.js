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
    [authJwt.verifyToken],
    controller.createMovement
  );

  //Retrieve a movement
  app.get(
    "/api/movements/:idMovement",
    [authJwt.verifyToken],
    controller.findOneMovement
  );
  
  app.get(
    "/api/movementsDependencies",
  );
  //Retrieve all movements
  app.get(
    "/api/movements/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAllMovements
  );

  //Retrieve a movement by wallets
  app.get(
    "/api/movementsByWallet/:id",
    [authJwt.verifyToken],
    controller.findAllMovementsByWallets
  );

  //Update a movement
  app.put(
    "/api/movement/update/:idMovement",
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