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
  
  //
  isAdmin = (req, res, next) => {
    Users.findByPk(req.IDUsers).then(user => {
          if (user.roleIDRoles === 2) {
            next();
            return;
        }
  
        res.status(403).send({
          message: "Requiere ser administrador!"
        });
        return;
    });  
  };
  
  const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
  };

  module.exports = authJwt;