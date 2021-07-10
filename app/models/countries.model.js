module.exports = (sequelize, Sequelize) => {
    const Countries = sequelize.define("countries", {
      IDCountries:{
        type: Sequelize.INTEGER(13),
        allowNull: false,
        primaryKey: true,
      },
      shortName: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Countries;
  };