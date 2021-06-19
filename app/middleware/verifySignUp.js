const { user } = require("../models");
const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    // 
    User.findOne({
      where: {
        correo: req.body.correo
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
          message: "Failed! Role does not exist = " + user.roleIDRoles
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