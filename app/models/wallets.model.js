module.exports = (sequelize,Sequelize) =>{
    const Wallets = sequelize.define("wallets", {
        IDWallets:{
            type: Sequelize.INTEGER(13),
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        amount:{
            type: Sequelize.FLOAT(10,2)
        },
        isActive:{
            type: Sequelize.BOOLEAN,
            defaultValue: 1
        },
        bankIDBank:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        userIDUsers:{
            type: Sequelize.INTEGER,
            primaryKey: true
        }

    });
      
    return Wallets;
};