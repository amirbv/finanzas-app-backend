const { authJwt } = require("../../middleware");
const controller = require("../../controllers/options.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    //Retrieve all options
    app.get(
      "/api/options/",
      [authJwt.verifyToken],
      controller.findAllOptions
    );
  
  };