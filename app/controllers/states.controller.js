const db = require("../models");
const States = db.state;

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

//Get the states
exports.findAllStates = (req, res) => {
  States.findAll().then(data => {
    res.status(200).send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Ocurrio un error al mostrar los estados"});
  });
};