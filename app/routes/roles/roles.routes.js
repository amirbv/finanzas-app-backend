const { authJwt } = require("../../middleware");
const controller = require("../../controllers/roles.controllers");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    //Retrieve all roles
    app.get(
      "/api/roles/",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.findAllRoles
    );
  
  };