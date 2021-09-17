const { authJwt } = require("../../middleware");
const controller = require("../../controllers/currencyType.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
      );
      next();
    });
  
    //Retrieve all currency types
    app.get(
      "/api/currencies/",
      [authJwt.verifyToken],
      controller.findAllCurrencyType
    );
  
  };