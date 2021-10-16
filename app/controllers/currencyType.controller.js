const { currencyType } = require("../models/index.js");
const db = require("../models/index.js");
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
    CurrencyType.findAll({order: [['name', 'ASC']]}).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al mostrar los tipos de divisa"});
    });
  };

   //Get one currency
   exports.findOneCurrency = (req, res) => {
    let IDCurrency = req.params.id;
    CurrencyType.findByPk(IDCurrency)
      .then((data) => {
        if (data) {
          res.status(200).send(data);
        } else {
          res.send({ message: "Divisa no encontrada" });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Ocurrio un error al mostrar la divisa",
        });
      });
  };

  //Create currency
  exports.createCurrency = (req, res) => {
    States.create({
      name: req.body.name,
      symbol: req.body.symbol,
      letterSymbol: req.body.letterSymbol
    })
      .then(
          res.status(200).send({
            message: 'Divisa creada con exito'
          })
      )
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  //Update currency
  exports.updateCurrency = (req, res) => {
    (async () => {
      let name = req.body.name;
      let symbol = req.body.symbol;
      let letterSymbol = req.body.letterSymbol;
      let IDCurrency = req.params.id;
      try {
        const result = await CurrencyType.update(
          {
            name: name,
            symbol: symbol,
            letterSymbol: letterSymbol
          },
          { where: { IDCurrencyType: IDCurrency } }
        );

        if (result == 1) {
          res.status(200).send({
            message: "Datos actualizados!",
          });
        } else {
          if (CurrencyType.name == name && CurrencyType.symbol == symbol && CurrencyType.letterSymbol == letterSymbol) {
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

  // Delete currency
  exports.deleteCurrency = (req, res) => {
    let IDCurrency = req.params.id;
    States.destroy({
      where: {IDCurrencyType:IDCurrency}
    }).then(result => {
      if (result == 1) {
        res.send({
          message: "Divisa borrada exitosamente."
        });
      } else {
        res.send({
          message: `No se pudo borrar id=${IDCurrency}. Quizas no existe.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
  };

