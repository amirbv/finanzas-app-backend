const db = require("../models/index.js");
const Roles = db.role;

exports.createRole = (roles) => {
    return Roles.create({
      name: roles.name
    })
      .then((roles) => {
        console.log(">> Rol creado: " + JSON.stringify(roles, null, 4));
        return roles;
      })
      .catch((err) => {
        console.log(">> Error mientras se creaba el rol: ", err);
      });
};

//Get the roles
exports.findAllRoles = (req, res) => {
  Roles.findAll().then(data => {
    res.status(200).send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Ocurrio un error al mostrar los roles"});
  });
};