const db = require("../models/index.js");
const MovementType = db.movementType;

exports.createMovementType = (req, res) => {

  MovementType.create({
    name: req.body.name,
  })
    .then((response) => {
      res.status(200).send({
        message: "Tipo de movimiento creado con exito",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
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

//Get one Movement Type
exports.findOneMovementType = (req, res) => {
  let IDMovementTypes = req.params.id;
  MovementType.findByPk(IDMovementTypes)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.send({ message: "Tipo de movimiento no encontrado" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al mostrar el tipo de movimiento",
      });
    });
};

//Update Movement Type
exports.updateMovementType = (req, res) => {
  (async () => {
    let name = req.body.name;
    let IDMovementTypes = req.params.id;
    try {
      const result = await MovementType.update(
        {
          name: name,
        },
        { where: { IDMovementType: IDMovementTypes } }
      );

      if (result == 1) {
        res.status(200).send({
          message: "Datos actualizados!",
        });
      } else {
        if (MovementType.name == name) {
          res.status(201).send({
            message: "Datos actualizados!",
          });
        }

        res.status(400).send({
          message: `Error en la actualizacion. Es posible que no se hayan realizados cambios en los datos del usuario o algun campo este vacío`,
        });
      }
    } catch (error) {
      // error handling
      res.status(500).send({
        message: "Error del servidor",
      });
    }
  })();
};

// Delete Movement Type
exports.deleteMovementType = (req, res) => {
  let name = req.body.name;
  let IDMovementTypes = req.params.id;

  MovementType.destroy({
    where: { IDMovementType: IDMovementTypes },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Tipo de movimiento borrado exitosamente.",
        });
      } else {
        res.send({
          message: `No se pudo borrar id=${IDMovementTypes}. Quizas no existe.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};