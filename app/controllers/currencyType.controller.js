const db = require("../models");
const CurrencyType = db.currencyType;

//Create currency type
exports.createCurrencyType = (currencyType) => {
    return CurrencyType.create({
      name: currencyType.name,
      symbol: currencyType.symbol,
      letterSymbol: currencyType.letterSymbol
    })
      .then((currencyType) => {
        console.log(">> Tipo de divisa creada: " + JSON.stringify(currencyType, null, 4));
        return currencyType;
      })
      .catch((err) => {
        console.log(">> Error mientras se creaba la divisa: ", err);
      });
  };

//Get all currency types
  exports.findAllCurrencyType = (req, res) => {
    CurrencyType.findAll().then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al mostrar los tipos de divisa"});
    });
  };