module.exports = (sequelize, Sequelize) => {
    const ConversionRate = sequelize.define("conversionRates", {
      IDConversionRate:{
        type: Sequelize.INTEGER(13),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return ConversionRate;
  };