module.exports = (sequelize,Sequelize) =>{
    const BudgetDetails = sequelize.define("budgetdetails", {
        IDBudgetDetails:{
            type: Sequelize.INTEGER(13),
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        optionIDOptions:{
            type: Sequelize.INTEGER(13),
            primaryKey: true,
            allowNull: false
        },
        amount:{
            type: Sequelize.FLOAT(10,2)
        },
        date:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        budgetIDBudget:{
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });
      
    return BudgetDetails;
};