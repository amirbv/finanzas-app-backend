const { wallets, budgetDetails } = require("../models/index.js");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models/index.js");
const Users = db.user;
const Movements = db.movements;
const Budgets = db.budgets;
const BudgetDetails = db.budgetDetails;

//Create and save new budgets
  exports.createBudget = (req, res) => {
    let token = req.headers['x-access-token']
    let dtoken = jwt.verify(token, config.secret);
    return Budgets.create({
        title: req.body.title,
        description: req.body.description,
        notificationDate: req.body.notificationDate,
        userIDUsers: dtoken.id
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err => {
        res.status(500).send({
            message:
              err.message || "Ocurrio un error al crear el presupuesto."});  
      }));
  };

  //Find all Budgets
  exports.findAllBudgets = (req, res) => {
    Budgets.findAll({attributes: show, include: requierements}).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al mostrar los presupuestos"});
    });
  };

  //find budgets by user
  exports.findAllBudgetsByUsers = (req, res) => {
    let token = req.headers['x-access-token']
    let dtoken = jwt.verify(token, config.secret);

    Budgets.findAll({where: {userIDUsers: dtoken.id}, attributes: show, include: requierements})
      .then((data) => {
        if(data){
          res.status(200).send(data);
        }else{
          res.status(404).send({message: "Presupuestos no encontrados"});
        }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al mostrar el presupuesto"});
      });
  }

  //Find a budget
  exports.findOneBudget = (req, res) => {
  const IDBdgt = req.params.id;
  let token = req.headers['x-access-token']
  let dtoken = jwt.verify(token, config.secret);
  
    Budgets.findOne({where: {IDBudget: IDBdgt, userIDUsers: dtoken.id}, attributes: show, include: requierements})
      .then((data) => {
        if(data){
          res.status(200).send(data);
        }else{
          res.status(404).send({message: "Presupuesto no encontrado"});
        }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al mostrar el presupuesto"});
      });
  };

  
  exports.updateBudget = (req, res) => {
    (async () => {
      const IDBdgt = req.params.id;
      let token = req.headers['x-access-token']
      let dtoken = jwt.verify(token, config.secret);
      let title, description, balance;

      try {
        let findBudget = await db.sequelize.query(`
        SELECT title, description, balance, notificationDate FROM budgets WHERE budgets.IDBudget = ${IDBdgt} AND budgets.userIDUsers = ${dtoken.id}
      `, { type: db.sequelize.QueryTypes.SELECT }); 

        req.body.title === findBudget[0].title ? title = findBudget[0].title : title = req.body.title;
        req.body.description === findBudget[0].description ? description = findBudget[0].description : description = req.body.description;
        if(req.body.title === ""){
          res.status(400).send({
            message: "Error. Campos vacios"
          })
        }else{
          try {
            await db.sequelize.query(`
            UPDATE budgets SET title = "${title}", description="${description}" WHERE budgets.IDBudget = ${IDBdgt} AND budgets.userIDUsers = ${dtoken.id}
            `, { type: db.sequelize.QueryTypes.UPDATE }).then(response => {
                response ? res.status(200).send({message: "Presupuesto actualizado con exito"}) : res.status(500).send({message: "Ocurrio un error al mostrar los presupuestos"})
            });
            } catch (error) {
                res.status(500).send({message: error})
            }  
        }
        
        } catch (error) {
          console.log(error)
          res.status(500).send({message: error})
        }

    })()
  };

  //Delete Budget
  exports.deleteBudget = (req, res) => {
    (async () => {

      const IDBdgt = req.params.id;
      let token = req.headers['x-access-token']
      let dtoken = jwt.verify(token, config.secret);

      try {
        let budget = await Budgets.destroy({where: {IDBudget: IDBdgt, userIDUsers: dtoken.id}})
        if(budget){
          let budgetDet = await db.sequelize.query(`DELETE FROM budgetdetails WHERE budgetsIDBudget = ${IDBdgt}`, { type: db.sequelize.QueryTypes.DELETE });
          if(budgetDet){
            res.status(200).send({message: "Monedero Borrado Exitosamente"})
          }
            res.status(200).send({message: "Monedero Borrado Exitosamente"})
        }
      } catch (error) {
        console.log(error)
        res.status(500).send({message: error})          
      }

    })()
  };

  //Movements Dependencies
  exports.walletsToShow = async (req, res) => {
    let token = req.headers["x-access-token"];
    let dtoken = jwt.verify(token, config.secret);
    let wallet = await db.sequelize.query(
      `
        SELECT IDWallets, name FROM wallets WHERE userIDUsers = ${dtoken.id}
      `,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    try {
      res.status(200).send(wallet);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };

  exports.BudgetDetailsToMovements = async(req, res) => {
    const IDBgt = req.params.id;
    let token = req.headers["x-access-token"];
    let dtoken = jwt.verify(token, config.secret);
    let wallet = req.body.wallet;
    let findBD = await db.sequelize.query(
      `
        SELECT * FROM budgetdetails WHERE budgetIDBudget = ${IDBgt}
      `,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    let findB = await db.sequelize.query(
      `
        SELECT title, balance FROM budgets WHERE IDBudget = ${IDBgt} AND userIDUsers=${dtoken.id}
      `,
      { type: db.sequelize.QueryTypes.SELECT }
    );
      
    let findW = await db.sequelize.query(
      `
        SELECT amount FROM wallets WHERE wallets.IDWallets = ${wallet}
      `,
      { type: db.sequelize.QueryTypes.SELECT }
    );
      try {
        findBD.forEach(async(element) => {
          await db.sequelize.query(
          `INSERT INTO movements(userIDUsers, title, description, optionIDOptions, movementTypeIDMovementType, amount,date, walletIDWallets, conversionRateIDConversionRate, conversionAmount) VALUES (${dtoken.id},"${element.title}","${element.description} (${findB[0].title})",${element.optionIDOptions},12,${element.amount}, NOW(),${wallet},1,${element.amount})`,
          { type: db.sequelize.QueryTypes.INSERT }
          );
        })
        let result = findW[0].amount + findB[0].balance;
        await db.sequelize.query(
          `UPDATE wallets SET amount=${result} WHERE wallets.IDWallets = ${wallet} AND wallets.userIDUsers = ${dtoken.id}`,
          { type: db.sequelize.QueryTypes.UPDATE }
        );
        try {
          let budget = await Budgets.destroy({where: {IDBudget: IDBgt, userIDUsers: dtoken.id}})
          if(budget){
            let budgetDet = await db.sequelize.query(`DELETE FROM budgetdetails WHERE budgetdetails.budgetIDBudget = ${IDBgt}`, { type: db.sequelize.QueryTypes.DELETE });
            if(budgetDet){
              res.status(200).send({message: "Presupuesto añadido exitosamente"})
            }
              res.status(200).send({message: "Presupuesto añadido exitosamente"})
          }
        } catch (error) {
          console.log(error)
          res.status(500).send({message: error})          
        }

      } catch (error) {
        res.send({message: error})
      }

  }

  let show = [
    "IDBudget",
    "title",
    "description",
    "balance",
    "notificationDate"
  ];

  let requierements = [
        
    {
      model: Users,
      as: "User"
    },
  ];