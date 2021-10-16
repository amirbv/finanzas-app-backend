const db = require("../models/index.js");
const bcrypt = require('bcryptjs');
const Users = db.user;
const Roles = db.role;
const States = db.state;
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

//Create and save new Users
  // exports.createUser = (users) => {
  //   return Users.create({
  //       fullName: users.fullName,
  //       email: users.email,
  //       password: users.password,
  //       city: users.city,
  //       stateIDStates: users.stateIDStates,
  //       isBlocked: users.isBlocked,
  //       roleIDRoles: users.roleIDRoles
  //   })
  //     .then((users) => {
  //       console.log(">> Usuario creado: " + JSON.stringify(users, null, 4));
  //       return users;
  //     })
  //     .catch((err) => {
  //       console.log(">> Error mientras se creaba el usuario: ", err);
  //     });
  // };

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
    let token = req.headers['x-access-token']
    let dtoken = jwt.verify(token, config.secret);

    Users.findByPk(dtoken.id, {attributes: show, include: requierements})
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

  exports.updateUserPassword = (req, res) => {
    (async () => {
      let token = req.headers['x-access-token']
      let dtoken = jwt.verify(token, config.secret);

      let password = req.body.password;
      let verifyPassword;
      let newPassword = req.body.newPassword;
      let confirmPassword = req.body.confirmPassword;
      
      
      try {
        if (newPassword == confirmPassword) {
          var hashedPassword = bcrypt.hashSync(req.body.newPassword, 8)
        }else{
          res.status(400).send({
            message:"Contraseñas no coinciden"
          })
        }

        let User = await Users.findByPk(dtoken.id, {attributes: ["password"]})
        verifyPassword = bcrypt.compareSync(password, User.password);
        if (verifyPassword){
          let UpdateUserPass = await Users.update({
            password: hashedPassword
          },{where: {IDUsers:dtoken.id}}
          )

          if (UpdateUserPass){
            res.status(200).send({
              message: "Contraseña actualizada exitosamente"
            })
          }
        }else{
          res.status(401).send({
            message: "Error. Contraseña anterior incorrecta"
          })
        }
      } catch (error) {
        res.status(500).send({
          message: "Error del servidor"
        })
      }

    })();
  }

  exports.updateUser = (req, res) => {
    (async () => { 
      let token = req.headers['x-access-token']
      let dtoken = jwt.verify(token, config.secret);
      let name = req.body.fullName;
      let state = parseInt(req.body.stateIDStates);
      let city = req.body.city;


      try{

        let User = await Users.findByPk(dtoken.id)

        const result = await Users.update({
          fullName: name, 
          stateIDStates: state,
          city: city
        }, 
          { where: { IDUsers: dtoken.id }}
        )

        if (result == 1) {
          res.status(200).send({
            message: "Datos actualizados!"
          });
        } else {

          if((User.fullName == name) && (User.stateIDStates == state) && (User.city == city)){
            res.status(201).send({
              message: "Datos actualizados!"
            })
          }

          res.status(400).send({
            message: `Error en la actualizacion. Es posible que no se hayan realizados cambios en los datos del usuario o algun campo este vacío`
          });
        }
      } catch (error) {
        // error handling
        res.status(500).send({
          message: "Error del servidor"
        });
      }
    })();

  };

  exports.deleteUser = (req, res) => {
    let token = req.headers['x-access-token']
    let dtoken = jwt.verify(token, config.secret);

    Users.destroy({
      where: {IDUsers:dtoken.id}
    }).then(result => {
      if (result == 1) {
        res.send({
          message: "Usuario borrado exitosamente."
        });
      } else {
        res.send({
          message: `No se pudo borrar id=${id}. Quizas no existe.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
  };

  exports.blockUser = (req, res) => {
    let id = req.params.id;
    let isBlocked = req.body.isBlocked;

    Users.update({
      isBlocked: isBlocked, 
    }, 
      { where: { IDUsers: id }}
    ).then(response => {
      res.status(200).send({ message: isBlocked === 0 ? 'Usuario activo' : 'Usuario bloqueado'})
    }
    ).catch(err => {
      res.status(500).send({message: err.response})
    })
  }

  let show = [
    "IDUsers",
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
