const db = require("../models/index.js");
const MovementType = db.movementType;

exports.createMovementType = (movementType) => {
    return MovementType.create({
      name: movementType.name
    })
      .then((movementType) => {
        console.log(">> Tipo de movimiento creado: " + JSON.stringify(movementType, null, 4));
        return options;
      })
      .catch((err) => {
        console.log(">> Error mientras se creaba el tipo de movimiento: ", err);
      });
  };

//Get the movements types
exports.findAllMovementType = (req, res) => {
    MovementType.findAll().then(data => {
    res.status(200).send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Ocurrio un error al mostrar los tipos de movimientos."});
  });
};