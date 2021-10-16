const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const Users = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No posee un token!"
      });
    }
    
    try {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
              return res.status(401).send({
                message: "Sin autorizacion!"
              });
            }
            
            req.IDUsers = decoded.id;
            next();
          });   
    } catch (error) {
        throw error;
    }
  };
  
  userIsBlocked = async(req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
      let emailUser = req.body.email;
      let user = await Users.findOne(
          {
            where: {email:emailUser}
          }
      );
      try {
        if (user === null) {
          res.status(404).send({
            message: "El usuario no existe"
          });
          return;
        }
        if (!user.isBlocked) {
          next();
          return;
        } else {
          res.status(403).send({
            message: "Su usuario fue bloqueado"
          });
          return;
        }
      } catch (error) {
        console.log(error.response)
      }
    }else{
      let dtoken = jwt.verify(token, config.secret);
      let user = await Users.findOne(
        {
          where: {IDUsers:dtoken.id,
                  isBlocked: 0}
        });

        try {
          if(user){
            next();
            return;
          }else{
            res.status(403).send({
              message: "Usuario bloqueado!"
            });
            return;
          }
        } catch (error) {
          console.log(error)
        }
    }
  }

  isAdmin = (req, res, next) => {
    (async () => {
      let token = req.headers["x-access-token"];
      if(!token){
        let emailUser = req.body.email;
        let user = await Users.findOne(
            {
              where: {email:emailUser}
            }
        );
  
  
        try {
          if (user === null) {
            res.status(404).send({
              message: "El usuario no existe"
            });
            return;
          }
          if (user.roleIDRoles === 2) {
            next();
            return;
          }else{
            res.status(403).send({
              message: "Requiere ser administrador!"
            });
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }else{
        let dtoken = jwt.verify(token, config.secret);
        let user = await Users.findOne(
          {
            where: {IDUsers:dtoken.id,
                    roleIDRoles: 2}
          });

          try {
            if(user){
              next();
              return;
            }else{
              res.status(403).send({
                message: "Requiere ser administrador!"
              });
              return;
            }
          } catch (error) {
            console.log(error)
          }
      }

    })();

  };
  
  const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    userIsBlocked: userIsBlocked
  };

  module.exports = authJwt;