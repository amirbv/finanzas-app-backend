const db = require("../models");
const config = require("../config/auth.config");
const Users = db.user;
const Roles = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  Users.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    city: req.body.city,
    stateIDStates: req.body.stateIDStates
  })
    .then(user => {
      if (user.roleIDRoles) {
        Roles.findAll({
          where: {IDRoles: user.roleIDRoles}
        }).then(() =>{
          var token = jwt.sign({ id: user.IDUsers }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        res.send({
          email: user.email,
          accessToken: token
        });
      });
            

      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.signin = (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Contraseña inválida!"
        });
      }

      var token = jwt.sign({ id: user.IDUsers }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        email: user.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};