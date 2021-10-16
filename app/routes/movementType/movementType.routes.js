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
  
  };