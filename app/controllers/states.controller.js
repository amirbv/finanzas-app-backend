const db = require("../models/index.js");
const States = db.state;

//Get the states
exports.findAllStates = (req, res) => {
  States.findAll({ order: [["name", "ASC"]] })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al mostrar los estados",
      });
    });
};

//Get one state
exports.findOneState = (req, res) => {
  let IDState = req.params.id;
  States.findByPk(IDState)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.send({ message: "Estado no encontrado" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al mostrar el estado",
      });
    });
};

//Create State
exports.createState = (req, res) => {
  // Save User to Database
  States.create({
    name: req.body.name,
  })
    .then((user) => {
      res.status(200).send({
        message: "Estado creado con exito",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Update States
exports.updateState = (req, res) => {
  (async () => {
    let name = req.body.name;
    let IDState = req.params.id;
    try {
      const result = await States.update(
        {
          name: name,
        },
        { where: { IDStates: IDState } }
      );

      if (result == 1) {
        res.status(200).send({
          message: "Datos actualizados!",
        });
      } else {
        if (States.name == name) {
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

// Delete State
exports.deleteState = (req, res) => {
  let name = req.body.name;
  let IDState = req.params.id;

  States.destroy({
    where: { IDStates: IDState },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Estado borrado exitosamente.",
        });
      } else {
        res.send({
          message: `No se pudo borrar id=${IDState}. Quizas no existe.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};
