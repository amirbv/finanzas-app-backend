const { authJwt } = require("../../middleware");
const controller = require("../../controllers/users.controllers");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  ); 

  app.get(
    "/api/users/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAllUsers
  );

  app.get(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findOneUser
  );

  app.put(
    "/api/users/update/:id",
    [authJwt.verifyToken],
    controller.updateUser
  );

};