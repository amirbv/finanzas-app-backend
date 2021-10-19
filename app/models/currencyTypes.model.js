module.exports = (sequelize, Sequelize) => {
    const CurrencyType = sequelize.define("currencyTypes", {
      IDCurrencyType:{
        type: Sequelize.INTEGER(13),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING
      },
      letterSymbol: {
        type: Sequelize.STRING
      }
    });
  
    return CurrencyType;
  };
