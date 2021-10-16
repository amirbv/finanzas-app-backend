const { authJwt } = require("../../middleware");
const controller = require("../../controllers/currencyType.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Retrieve all currency types
  app.get(
    "/api/currencies/",
    [authJwt.verifyToken],
    controller.findAllCurrencyType
  );

  //Retrieve a currency
  app.get(
    "/api/currency/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findOneCurrency
  );

  //Create a currency
  app.post(
    "/api/currency/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createCurrency
  );

  //Update a currency
  app.put(
    "/api/currency/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateCurrency
  );

  //Delete a currency
  app.delete(
    "/api/currency/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteCurrency
  );
};
