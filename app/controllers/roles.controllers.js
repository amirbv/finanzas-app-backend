const db = require("../models");
const Roles = db.role;

exports.createRole = (roles) => {
    return Roles.create({
      name: roles.name
    })
      .then((roles) => {
        console.log(">> Rol creado: " + JSON.stringify(roles, null, 4));
        return tutorial;
      })
      .catch((err) => {
        console.log(">> Error mientras se creaba el rol: ", err);
      });
  };