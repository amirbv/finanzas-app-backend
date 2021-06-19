const db = require("../models");
const Users = db.user;

//Create and save new Users
exports.createUser = (users) => {
    return Users.create({
        fullName: users.fullName,
        email: users.email,
        password: users.password,
        citty: users.city,
        IDStates: users.IDStates,
        isBlocked: users.isBlocked,
        IDRoles: users.IDRoles
    })
      .then((users) => {
        console.log(">> Usuario creado: " + JSON.stringify(users, null, 4));
        return users;
      })
      .catch((err) => {
        console.log(">> Error mientras se creaba el usuario: ", err);
      });
  };

//Get the states for a given User
exports.findUserById = (IDUsers) => {
    return Users.findByPk(IDUsers, { include: {all:true} })
      .then((IDUsers) => {
        return IDUsers;
      })
      .catch((err) => {
        console.log(">> Error mientras se encontraban usuarios: ", err);
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
