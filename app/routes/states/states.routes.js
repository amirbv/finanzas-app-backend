const { authJwt } = require("../../middleware");
const controller = require("../../controllers/states.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
      );
      next();
    });
  
    //Retrieve all states
    app.get(
      "/api/states/",
      [authJwt.userIsBlocked],
      controller.findAllStates
    );

    //Retrieve a state
    app.get(
      "/api/state/:id",
      [authJwt.verifyToken, authJwt.isAdmin, authJwt.userIsBlocked],
      controller.findOneState
    );

    //Create a state
    app.post(
      "/api/state/",
      [authJwt.verifyToken, authJwt.isAdmin, authJwt.userIsBlocked],
      controller.createState
    );

    //Update a state
    app.put(
      "/api/state/:id",
      [authJwt.verifyToken, authJwt.isAdmin, authJwt.userIsBlocked],
      controller.updateState
    );

    //Delete a state
    app.delete(
      "/api/state/:id",
      [authJwt.verifyToken, authJwt.isAdmin, authJwt.userIsBlocked],
      controller.deleteState
    );
  
  };
