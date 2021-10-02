const db = require("../models/index.js");
const Banks = db.banks;
const CurrencyTypes = db.currencyType;
const Countries = db.countries;

//Create and save new Banks
  exports.createBank = (banks) => {
    return Banks.create({
        name: banks.name,
        shortName: banks.shortName,
        photoURL: banks.photoURL,
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

  exports.findWalletDependencies = async(req, res) => {
    let banks = await Banks.findAll({attributes: show, include: requierements});
    let currencies = await CurrencyTypes.findAll();
    try {
      res.status(200).send({currencies, banks});
    } catch (error) {
      res.status(500).send({
        message: error.message
      })
    }
  }
  
  let show = [
    "IDBank",
    "name",
    "shortName",
    "photoURL"
  ];

  let requierements = [
       
    {
      model: Countries,
      as: "Countries"
    }
  ];