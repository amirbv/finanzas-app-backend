const { authJwt } = require("../../middleware");
const controller = require("../../controllers/budgets.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //create a budget
  app.post(    
    "/api/budget/",
    [authJwt.verifyToken],
    controller.createBudget
  );

  //Retrieve a wallet
  app.get(
    "/api/budgets/:id",
    [authJwt.verifyToken],
    controller.findOneBudget
  );
  
  //Retrieve all budgets
  app.get(
    "/api/budgets/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAllBudgets
  );

  //Retrieve budgets by user
  app.get(
    "/api/budgetsByUser/",
    [authJwt.verifyToken],
    controller.findAllBudgetsByUsers
  );

  app.get(
    "/api/walletsToShow/",
    [authJwt.verifyToken],
    controller.walletsToShow
  )

  //Update a Wallet
  app.put(
    "/api/budgets/:id",
    [authJwt.verifyToken],
    controller.updateBudget
  );

  //Delete a wallet
  app.delete(
    "/api/budgets/:id",
    [authJwt.verifyToken],
    controller.deleteBudget
  );

  app.post(
    "/api/budgetToMov/:id",
    [authJwt.verifyToken],
    controller.BudgetDetailsToMovements
  )
};