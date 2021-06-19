const db = require("../models");
const Usuarios = db.user;

//Create and save new Users
exports.createUser = (usuarios) => {
    return Usuarios.create({
        nombreCompleto: usuarios.nombreCompleto,
        correo: usuarios.correo,
        clave: usuarios.clave,
        ciudad: usuarios.ciudad,
        estadoIDestados: usuarios.estadoIDestados,
        isBlocked: usuarios.isBlocked,
        roleIDRoles: usuarios.roleIDRoles
    })
      .then((usuarios) => {
        console.log(">> Usuario creado: " + JSON.stringify(usuario, null, 4));
        return usuarios;
      })
      .catch((err) => {
        console.log(">> Error mientras se creaba el usuario: ", err);
      });
  };

//Get the states for a given User
exports.findUserById = (IDUsuarios) => {
    return Usuarios.findByPk(IDUsuarios, { include: {all:true} })
      .then((IDUsuarios) => {
        return IDUsuarios;
      })
      .catch((err) => {
        console.log(">> Error while finding tutorial: ", err);
      });
  };

  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
