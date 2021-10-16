module.exports = (sequelize,Sequelize) =>{
    const Budgets = sequelize.define("budgets", {
        IDBudget:{
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
        balance:{
            type: Sequelize.FLOAT(10,2)
        },
        date:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        userIDUsers:{
            type: Sequelize.INTEGER,
            primaryKey: true
        }

    });
      
    return Budgets;
};