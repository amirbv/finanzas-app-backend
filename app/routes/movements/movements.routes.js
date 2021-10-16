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
  
  //Retrieve all movements dependencies
  app.get(
    "/api/movementsDependencies",
    [authJwt.verifyToken],
    controller.movementsDependencies
  );

  //Retrieve all movements
  app.get(
    "/api/movements/",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.userIsBlocked],
    controller.findAllMovements
  );

  //Retrieve a movement by wallets
  app.get(
<<<<<<< HEAD
    "/api/movements/:idWallet",
    [authJwt.verifyToken, authJwt.userIsBlocked],
=======
    "/api/movementsByWallet/:id",
    [authJwt.verifyToken],
>>>>>>> parent of c2a691b (Se ha añadido Retrieve users.)
    controller.findAllMovementsByWallets
  );

  //Update a movement
  app.put(
<<<<<<< HEAD
    "/api/movement/update/:idMovement",
    [authJwt.verifyToken, authJwt.userIsBlocked],
=======
    "/api/movement/:idMovement",
    [authJwt.verifyToken],
>>>>>>> parent of c2a691b (Se ha añadido Retrieve users.)
    controller.updateMovement
  );

  //Delete a movement
  app.delete(
<<<<<<< HEAD
    "/api/movement/delete/:idWallet/:idMovement",
    [authJwt.verifyToken, authJwt.userIsBlocked],
=======
    "/api/movement/:idMovement",
    [authJwt.verifyToken],
>>>>>>> parent of c2a691b (Se ha añadido Retrieve users.)
    controller.deleteMovement
  );
};