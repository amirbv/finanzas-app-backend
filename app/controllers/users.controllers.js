const db = require("../models");
const Users = db.user;
const Roles = db.role;
const States = db.state;

//Create and save new Users
  exports.createUser = (users) => {
    return Users.create({
        fullName: users.fullName,
        email: users.email,
        password: users.password,
        city: users.city,
        stateIDStates: users.stateIDStates,
        isBlocked: users.isBlocked,
        roleIDRoles: users.roleIDRoles
    })
      .then((users) => {
        console.log(">> Usuario creado: " + JSON.stringify(users, null, 4));
        return users;
      })
      .catch((err) => {
        console.log(">> Error mientras se creaba el usuario: ", err);
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

  exports.findAllUsers = (req, res) => {
    Users.findAll({attributes: show, include: requierements}).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al mostrar los usuarios"});
    });
  };

  exports.findOneUser = (req, res) => {
  const IDUser = req.params.id;

    Users.findByPk(IDUser, {attributes: show, include: requierements})
      .then((data) => {
        if(data){
          res.status(200).send(data);
        }else{
          res.send({message: "Usuario no encontrado"});
        }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al mostrar el usuario"});
      });
  };

  exports.updateUser = (req, res) => {
    const IDUser = req.params.id;

    Users.update(req.body, {
      where: {IDUsers:IDUser}
    }).then(result => {
      if (result == 1) {
        res.send({
          message: "Usuario actualizado."
        });
      } else {
        res.send({
          message: `No se pudo actualizar id=${id}. Quizas no existe o el req.body esta vacio`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
  };

  let show = [
    "fullName",
    "email",
    "city",
    "createdAt",
    "isBlocked"
  ];

  let requierements = [
    {
      model: States,
      as: "State"
    },
        
    {
      model: Roles,
      as: "Role"
    }
  ];