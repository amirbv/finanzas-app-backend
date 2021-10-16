module.exports = (sequelize,Sequelize) =>{
    const Movements = sequelize.define("movements", {
        IDMovements:{
            type: Sequelize.INTEGER(13),
            primaryKey: true,
            autoIncrement: true
        },
        userIDUsers:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title:{
            type: Sequelize.STRING,
            allowNull: false
        },
        description:{
            type: Sequelize.STRING,
            defaultValue: "Sin descripcion..."
        },
        optionIDOptions:{
            type: Sequelize.INTEGER(13),
            primaryKey: true,
            allowNull: false
        },
        movementTypeIDMovementType:{
            type: Sequelize.INTEGER(13),
            primaryKey: true,
            allowNull: false
        },
        amount:{
            type: Sequelize.FLOAT(10,2),
            allowNull: false
        },
        date:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        walletIDWallets:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        conversionRateIDConversionRate:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            defaultValue: 1
        },
        conversionAmount: {
            type: Sequelize.FLOAT(10,2),
            defaultValue: 0
        }
    });

    return Movements;
};