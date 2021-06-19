const db = require("../models");
const Estados = db.state;
const Usuarios = db.user;

exports.createEstado = (estados) => {
    return Estados.create({
      nombre: estado.nombre
    })
      .then((estados) => {
        console.log(">> Estado creado: " + JSON.stringify(estados, null, 4));
        return estados;
      })
      .catch((err) => {
        console.log(">> Error mientras se creaba el estado: ", err);
      });
  };

//Get the states for a given User
exports.findUsuarioById = (IDUsuario) => {
    return Usuarios.findByPk(IDUsuario, { include: {all:true} })
      .then((IDUsuario) => {
        return IDUsuario;
      })
      .catch((err) => {
        console.log(">> Error while finding tutorial: ", err);
      });
  };