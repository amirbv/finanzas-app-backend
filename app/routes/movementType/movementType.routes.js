const { authJwt } = require("../../middleware");
const controller = require("../../controllers/movementType.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
      );
      next();
    });
  
    //Retrieve all movement types
    app.get(
      "/api/movementType/",
      [authJwt.verifyToken],
      controller.findAllMovementType
    );
  
  };