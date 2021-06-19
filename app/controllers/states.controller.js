const db = require("../models");
const States = db.state;
const Users = db.user;

exports.createState = (states) => {
    return States.create({
      name: states.name
    })
      .then((states) => {
        console.log(">> Estado creado: " + JSON.stringify(states, null, 4));
        return states;
      })
      .catch((err) => {
        console.log(">> Error mientras se creaba el estado: ", err);
      });
  };

//Get the states for a given User
exports.findUserById = (IDUers) => {
    return Users.findByPk(IDUsers, { include: {all:true} })
      .then((IDUsers) => {
        return IDUsers;
      })
      .catch((err) => {
        console.log(">> Error mientras se buscaba el estado: ", err);
      });
  };