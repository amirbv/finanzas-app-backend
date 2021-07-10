const db = require("../models");
const Banks = db.banks;
const CurrencyTypes = db.currencyType;
const Countries = db.countries;

//Create and save new Banks
  exports.createBank = (banks) => {
    return Banks.create({
        name: banks.name,
        shortName: banks.shortName,
        photoURL: banks.photoURL,
        currencyTypeIDCurrencyTypes: banks.currencyTypeIDCurrencyTypes,
        countriesIDCountries: banks.countriesIDCountries
    })
      .then((banks) => {
        console.log(">> Banco creado: " + JSON.stringify(banks, null, 4));
        return banks;
      })
      .catch((err) => {
        console.log(">> Error mientras se creaba el banco: ", err);
      });
  };

  exports.findAllBanks = (req, res) => {
    Banks.findAll({attributes: show, include: requierements}).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al mostrar los usuarios"});
    });
  };
  
  let show = [
    "IDBank",
    "name",
    "shortName",
    "photoURL"
  ];

  let requierements = [
    {
      model: CurrencyTypes,
      as: "CurrencyTypes"
    },
        
    {
      model: Countries,
      as: "Countries"
    }
  ];