const { authJwt } = require("../../middleware");
const controller = require("../../controllers/movementType.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    //Retrieve all movement types
    app.get(
      "/api/movementType/",
      [authJwt.verifyToken, authJwt.userIsBlocked],
      controller.findAllMovementType
    );

    //Retrieve a movement types
    app.get(
      "/api/movementType/:id",
      controller.findOneMovementType
    );

    //Create a movement types
    app.post(
      "/api/movementType/",
      [authJwt.verifyToken, authJwt.isAdmin, authJwt.userIsBlocked],
      controller.createMovementType
    );

    //Update a movement types
    app.put(
      "/api/movementType/:id",
      [authJwt.verifyToken, authJwt.isAdmin, authJwt.userIsBlocked],
      controller.updateMovementType
    );

    //Delete a movement types
    app.delete(
      "/api/movementType/:id",
      [authJwt.verifyToken, authJwt.isAdmin, authJwt.userIsBlocked],
      controller.deleteMovementType
    );
  
  };