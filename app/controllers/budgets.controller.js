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
        SELECT title, description, balance FROM budgets WHERE budgets.IDBudget = ${IDBdgt} AND budgets.userIDUsers = ${dtoken.id}
      `, { type: db.sequelize.QueryTypes.SELECT }); 

        req.body.title === findBudget[0].name ? title = findBudget[0].title : title = req.body.title;
        req.body.description === findBudget[0].description ? description = findBudget[0].description : description = req.body.description;

        if(req.body.name === "" || req.body.description === ""){
          title = "";
          description = "";
          res.status(400).send({
            message: "Error. Campos vacios"
          })
        }else{
          try {
            await db.sequelize.query(`
            UPDATE budgets SET name = "${title}", description="${description}" WHERE budgets.IDBudget = ${IDBdgt} AND budgets.userIDUsers = ${dtoken.id}
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
        if(wallet){
          let budgetDet = await db.sequelize.query(`DELETE FROM budgetdetails WHERE budgetIDBudget = ${IDBdgt} AND userIDUsers=${dtoken.id}`, { type: db.sequelize.QueryTypes.DELETE });
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

  let show = [
    "IDBudget",
    "title",
    "description",
    "balance"
  ];

  let requierements = [
        
    {
      model: Users,
      as: "User"
    },
  ];