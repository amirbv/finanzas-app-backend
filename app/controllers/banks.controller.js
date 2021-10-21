const db = require("../models/index.js");
const Banks = db.banks;
const CurrencyTypes = db.currencyType;
const Countries = db.countries;

//Get one Bank
exports.findOneBank = (req, res) => {
  let IDBanks = req.params.id;
  Banks.findByPk(IDBanks)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.send({ message: "Banco no encontrado" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al mostrar el banco",
      });
    });
};

//Create Bank
exports.createBank = (req, res) => {
  Banks.create({
    name: req.body.name,
    shortName: req.body.shortName,
    photoURL: req.body.photoURL,
    countryIDCountries: req.body.country,
  })
    .then((data) => res.status(200).send(data)
    .catch((err) => {
      res.status(500).send({ message: err.message });
    })
};

//Update Bank
exports.updateBank = (req, res) => {
  (async () => {
    let name = req.body.name;
    let shortName = req.body.shortName;
    let photoURL = req.body.photoURL;
    let country = req.body.country;
    let IDBanks = req.params.id;
    try {
      const result = await Banks.update(
        {
          name: name,
          shortName: shortName,
          photoURL: photoURL,
          countryIDCountries: country
        },
        { where: { IDBank: IDBanks } }
      );

      if (result == 1) {
        res.status(200).send({
          message: "Datos actualizados!",
        });
      } else {
        if (Banks.name == name && Banks.shortName == shortName && Banks.photoURL == photoURL && Banks.countryIDCountries == country) {
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

// Delete Bank
exports.deleteBank = (req, res) => {
  let IDBanks = req.params.id;

  Banks.destroy({
    where: { IDBank: IDBanks },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Banco borrado exitosamente.",
        });
      } else {
        res.send({
          message: `No se pudo borrar id=${IDBanks}. Quizas no existe.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
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
    let banks = await Banks.findAll({order: [
          ['photoURL', 'ASC'],
      ],attributes: show, include: requierements});
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
