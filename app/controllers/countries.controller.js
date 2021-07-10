const db = require("../models");
const Countries = db.countries;

//Create country
exports.createCountry = (country) => {
    return country.create({
      shortName: country.shortName,
      name: country.name
    })
      .then((country) => {
        console.log(">> Tipo de divisa creada: " + JSON.stringify(country, null, 4));
        return country;
      })
      .catch((err) => {
        console.log(">> Error mientras se creaba la divisa: ", err);
      });
  };

//Get all countries
  exports.findAllCountries = (req, res) => {
    Countries.findAll().then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al mostrar los tipos de divisa"});
    });
  };