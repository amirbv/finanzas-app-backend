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
  
  //Retrieve a user
  app.get(
    "/api/users/:id",
    [authJwt.verifyToken],
    controller.findOneUser
  );

  //Update a User
  app.put(
    "/api/users/update/:id",
    [authJwt.verifyToken],
    controller.updateUser
  );

  //Update a User Password
  app.put(
    "/api/users/updatePass/:id",
    [authJwt.verifyToken],
    controller.updateUserPassword
  );

  //Delete a user
  app.delete(
    "/api/users/delete/:id",
    [authJwt.verifyToken],
    controller.deleteUser
  );
};