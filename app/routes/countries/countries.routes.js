const { authJwt } = require("../../middleware");
const controller = require("../../controllers/countries.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
      );
      next();
    });
  
    //Retrieve all countries
    app.get(
      "/api/countries/",
      [authJwt.verifyToken],
      controller.findAllCountries
    );
  
  };