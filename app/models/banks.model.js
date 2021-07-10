module.exports = (sequelize,Sequelize) =>{
    const Banks = sequelize.define("banks", {
        IDBank:{
            type: Sequelize.INTEGER(13),
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING
        },
        shortName:{
            type: Sequelize.STRING
        },
        photoURL:{
            type: Sequelize.STRING
        },
        currencyTypeIDCurrencyTypes:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        countriesIDCountries:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        }

    });

    return Banks;
};