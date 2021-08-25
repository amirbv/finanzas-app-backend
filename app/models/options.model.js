module.exports = (sequelize, Sequelize) => {
    const Options = sequelize.define("options", {
      IDOptions:{
        type: Sequelize.INTEGER(13),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Options;
  };