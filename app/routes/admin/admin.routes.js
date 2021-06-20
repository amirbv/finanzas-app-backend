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

  //Retrieve all users
  app.get(
    "/api/users/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAllUsers
  );

  //Retrive one user
  app.get(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findOneUser
  );

};