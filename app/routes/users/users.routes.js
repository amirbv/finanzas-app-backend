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
    "/api/allUsers/",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.userIsBlocked],
    controller.findAllUsers
  );

  //Retrieve a user
  app.get(
    "/api/users/",
    [authJwt.verifyToken, authJwt.userIsBlocked],
    controller.findOneUser
  );

  //Update a User
  app.put(
    "/api/users/update/",
    [authJwt.verifyToken, authJwt.userIsBlocked],
    controller.updateUser
  );

  //Update a User Password
  app.put(
    "/api/users/updatePass/",
    [authJwt.verifyToken, authJwt.userIsBlocked],
    controller.updateUserPassword
  );

  //Delete a user
  app.delete(
    "/api/users/delete/",
    [authJwt.verifyToken, authJwt.userIsBlocked],
    controller.deleteUser
  );

  // Block user
  app.put(
    "/api/blockUser/:id",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.userIsBlocked],
    controller.blockUser
  )
};