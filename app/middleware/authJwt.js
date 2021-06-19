const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Users = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    try {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
              return res.status(401).send({
                message: "Unauthorized!"
              });
            }
            
            req.IDUsers = decoded.id;
            next();
          });   
    } catch (error) {
        throw error;
    }
  };
  
  isAdmin = (req, res, next) => {
    Users.findByPk(req.IDUsers).then(user => {
          if (user.IDRoles === 2) {
            next();
            return;
        }
  
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
    });  
  };
  
  const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
  };

  module.exports = authJwt;