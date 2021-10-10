const db = require("../models/index.js");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
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

  exports.sendEmail = async(req, res) => {
    let Email = req.body.email;
    let User = await Users.findOne({where: {email: Email}})
    var randomstring = Math.random().toString(36).substr(2, 8);
    var hashedPassword = bcrypt.hashSync(randomstring, 8)

    if(User){
      await Users.update({
        password: hashedPassword
      },{where: {email: Email}}

      )
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth:{
          user: 'pruebasfinancy@gmail.com',
          pass: '@abc12345'
        }
      });
  
      let mailOptions = {
        from: 'pruebasfinancy@gmail.com',
        to: User.email,
        subject: 'Financy: Recover Password',
        text: `Tu contraseña se ha reseteado. Inicie sesión con la siguiente contraseña: ${randomstring} Se le recomienda cambiarla una vez este dentro de la app`
      }

      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error)
        }else{
          res.status(200).send({
            message: `Email enviado exitosamente ${info.response}`
          })
        }
      });
    }else{
      res.status(404).send({
        message: "Error. Usuario no encontrado"
      })
    }


  };