const db = require("../models/index.js");
const ConversionRate = db.conversionRate;

exports.createConversionRate = (conversionRate) => {
    return ConversionRate.create({
      name: conversionRate.name
    })
      .then((conversionRate) => {
        console.log(">> Tasa de conversion creada: " + JSON.stringify(conversionRate, null, 4));
        return options;
      })
      .catch((err) => {
        console.log(">> Error mientras se creaba la tasa de conversion: ", err);
      });
  };

//Get the conversions rates
exports.findAllConversionRate = (req, res) => {
    ConversionRate.findAll().then(data => {
    res.status(200).send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Ocurrio un error al mostrar las tasas de conversion."});
  });
};