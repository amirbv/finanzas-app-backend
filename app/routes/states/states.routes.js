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
      controller.findAllStates
    );
  
  };
