const { authJwt } = require("../../middleware");
const controller = require("../../controllers/banks.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  //Retrieve all users
  app.get(
    "/api/banks/",
    [authJwt.verifyToken],
    controller.findAllBanks
  );

};