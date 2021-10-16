const { authJwt } = require("../../middleware");
const controller = require("../../controllers/budgetDetails.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //create a budget detail
  app.post(    
    "/api/budgetDetail/:id",
    [authJwt.verifyToken],
    controller.createBudgetDetail
  );

  //Retrieve a budget detail
  app.get(
    "/api/budgetDetails/:id",
    [authJwt.verifyToken],
    controller.findOneBudgetDetail
  );
  
  //Retrieve all budgets details
  app.get(
    "/api/budgetDetails/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAllBudgetsDetails
  );

  //Retrieve budgets details by user
  app.get(
    "/api/budgetDetailsByBudget/",
    [authJwt.verifyToken],
    controller.findAllBudgetsDetailsByBudget
  );

  //Update a budget detail
  app.put(
    "/api/budgetDetails/:id",
    [authJwt.verifyToken],
    controller.updateBudgetDetails
  );

//   //Delete a wallet
//   app.delete(
//     "/api/budgets/:id",
//     [authJwt.verifyToken],
//     controller.deleteBudget
//   );
};