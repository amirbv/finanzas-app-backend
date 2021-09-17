const { user } = require("../models/index.js");
const db = require("../models/index.js");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    // 
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Error! El correo ya esta en uso!"
        });
        return;
      }
      next();
    });
};

checkRolesExisted = (req, res, next) => {
  if (user.roleIDRoles) {
      if (!user.roleIDRoles) {
        res.status(400).send({
          message: "Error! El rol no existe = " + user.roleIDRoles
        });
        return;
      }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;