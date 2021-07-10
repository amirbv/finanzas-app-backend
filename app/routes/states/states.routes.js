const { authJwt } = require("../../middleware");
const controller = require("../../controllers/states.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    //Retrieve all states
    app.get(
      "/api/states/",
      [authJwt.verifyToken],
      controller.findAllStates
    );
  
  };
