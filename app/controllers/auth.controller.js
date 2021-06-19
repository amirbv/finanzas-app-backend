const db = require("../models");
const config = require("../config/auth.config");
const Usuarios = db.user;
const Roles = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  Usuarios.create({
    nombreCompleto: req.body.nombreCompleto,
    correo: req.body.correo,
    clave: bcrypt.hashSync(req.body.clave, 8),
    ciudad: req.body.ciudad,
    estadoIDestados: req.body.estadoIDestados
  })
    .then(user => {
      if (user.roleIDRoles) {
        Roles.findAll({
          where: {IDRoles: user.roleIDRoles}
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Usuario registrado con exito!" });
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.signin = (req, res) => {
  Usuarios.findOne({
    where: {
      correo: req.body.correo
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.clave,
        user.clave
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Contraseña inválida!"
        });
      }

      var token = jwt.sign({ id: user.IDUsuarios }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        correo: user.correo,
        rolesID: user.roleIDRoles,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};