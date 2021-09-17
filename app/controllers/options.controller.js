const db = require("../models/index.js");
const Options = db.options;

exports.createOption = (options) => {
    return Options.create({
      name: options.name
    })
      .then((options) => {
        console.log(">> Opcion creada: " + JSON.stringify(options, null, 4));
        return options;
      })
      .catch((err) => {
        console.log(">> Error mientras se creaba la opcion: ", err);
      });
  };

//Get the options
exports.findAllOptions = (req, res) => {
  Options.findAll().then(data => {
    res.status(200).send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Ocurrio un error al mostrar las opciones."});
  });
};