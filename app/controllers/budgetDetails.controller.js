const { wallets, budgetDetails } = require("../models/index.js");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models/index.js");
const { response } = require("express");
const Users = db.user;
const Movements = db.movements;
const Budgets = db.budgets;
const BudgetDetails = db.budgetDetails;

//Create and save new budgetsDetails
  exports.createBudgetDetail = (req, res) => {
    let IDBdgt = req.params.id
    let op, amount;

    if(req.body.option == 1){
        op = 1;
        amount = req.body.amount;
    }

    if(req.body.option == 2){
        op = 2;
        amount = req.body.amount * (- 1);
    }

    return BudgetDetails.create({
        title: req.body.title,
        description: req.body.description,
        optionIDOptions: op,
        amount: amount,
        budgetsIDBudget: IDBdgt
    })
      .then((data) => {
        (async () => {
            await db.sequelize.query(`
            SELECT balance FROM budgets WHERE budgets.IDBudget = ${IDBdgt}
            `, { type: db.sequelize.QueryTypes.SELECT }).then(response => {
                (async () => {
                    let sum;
                    if(response[0].balance === null){
                        sum = 0 + req.body.amount;
                    }else{
                        sum = response[0].balance + req.body.amount;
                    }
                    await db.sequelize.query(`
                    UPDATE budgets SET balance = ${sum} WHERE budgets.IDBudget = ${IDBdgt}
                    `, { type: db.sequelize.QueryTypes.UPDATE }).then(response => {
                        res.status(200).send(data)
                    });
                })()
            });    
        })()
        
    })
      .catch((err => {
        res.status(500).send({
            message:
              err.message || "Ocurrio un error al crear el detalle del presupuesto."});  
      }));
  };

  //Find all Budgets
  exports.findAllBudgetsDetails = (req, res) => {
    BudgetDetails.findAll({attributes: show, include: requierements}).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al mostrar los presupuestos"});
    });
  };

  //find budgetsDetails by budget
  exports.findAllBudgetsDetailsByBudget = (req, res) => {
    let token = req.headers['x-access-token']
    let dtoken = jwt.verify(token, config.secret);

    Budgets.findAll({where: {userIDUsers: dtoken.id}})
      .then((data) => {
        BudgetDetails.findAll({where: {budgetIDBudget: data[0].IDBudget}})
        .then((response) => res.status(200).send(response))
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al mostrar el detalle de presupuesto"});
      });
  }

  //Find a budget detail
  exports.findOneBudgetDetail = (req, res) => {
  const IDBudgetDetail = req.params.id;
  
    BudgetDetails.findOne({where: {IDBudgetDetails: IDBudgetDetail}, attributes: show, include: requierements})
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

  
  exports.updateBudgetDetails = async(req, res) => {
    (async () => {
      const IDBudgetDetail = req.params.id;
      let title, description, amount, op, idb;

      try {
        let findBudgetD = await db.sequelize.query(`
        SELECT title, description, amount, budgetIDBudget FROM budgetdetails WHERE budgetdetails.IDBudgetDetails = ${IDBudgetDetail}
      `, { type: db.sequelize.QueryTypes.SELECT }); 

        req.body.title === findBudgetD[0].title ? title = findBudgetD[0].title : title = req.body.title;
        req.body.description === findBudgetD[0].description ? description = findBudgetD[0].description : description = req.body.description;
        req.body.amount === findBudgetD[0].amount ? amount = findBudgetD[0].amount : amount = req.body.amount;
        req.body.option === findBudgetD[0].optionIDOptions ? op = findBudgetD[0].optionIDOptions : op = req.body.option;
        idb = findBudgetD[0].budgetIDBudget 
        if(op == 2){
            amount = amount *(-1);
        }
        if(req.body.title === "" || req.body.amount === ""){
          title = "";
          description = "";
          amount = "";
          res.status(400).send({
            message: "Error. Campos vacios"
          })
        }else{
          try {
            await db.sequelize.query(`
            UPDATE budgetdetails SET title = "${title}", description="${description}", amount=${amount}, optionIDOptions=${op} WHERE budgetDetails.IDBudgetDetails = ${IDBudgetDetail}
            `, { type: db.sequelize.QueryTypes.UPDATE }).then(response1 => {
                (async () => {
                    await db.sequelize.query(`
                    SELECT SUM(amount) as suma FROM budgetdetails WHERE budgetDetails.budgetIDBudget = ${idb}
                    `, { type: db.sequelize.QueryTypes.SELECT }).then(response2 => {
                        (async () => {
                            await db.sequelize.query(`
                            UPDATE budgets SET balance = ${response2[0].suma} WHERE budgets.IDBudget = ${idb}
                            `, { type: db.sequelize.QueryTypes.UPDATE }).then(response3 => {
                                res.status(200).send({message: "Detalle de presupuesto actualizado"})
                            });
                        })()
                    });
                })()

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

//   //Delete Budget
//   exports.deleteBudget = (req, res) => {
//     (async () => {

//       const IDBdgt = req.params.id;
//       let token = req.headers['x-access-token']
//       let dtoken = jwt.verify(token, config.secret);

//       try {
//         let budget = await Budgets.destroy({where: {IDBudget: IDBdgt, userIDUsers: dtoken.id}})
//         if(budget){
//           let budgetDet = await db.sequelize.query(`DELETE FROM budgetdetails WHERE budgetsIDBudget = ${IDBdgt}`, { type: db.sequelize.QueryTypes.DELETE });
//           if(budgetDet){
//             res.status(200).send({message: "Monedero Borrado Exitosamente"})
//           }
//             res.status(200).send({message: "Monedero Borrado Exitosamente"})
//         }
//       } catch (error) {
//         console.log(error)
//         res.status(500).send({message: error})          
//       }

//     })()
//   };

  let show = [
    "IDBudgetDetails",
    "title",
    "description",
    "amount",
    "date"
  ];

  let requierements = [
        
    {
      model: Budgets,
      as: "Budget"
    },
  ];