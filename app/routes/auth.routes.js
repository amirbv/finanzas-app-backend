const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Create a user
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  //Signin a User
  app.post("/api/auth/signin", controller.signin);

  //Signin a Admin
  app.post("/api/auth/signin/admin",
  [
    authJwt.isAdmin
  ],
  controller.signin
  );
};