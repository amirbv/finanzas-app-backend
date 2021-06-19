module.exports = (sequelize, Sequelize) => {
    const Estados = sequelize.define("estados", {
    IDestados:{
        type: Sequelize.INTEGER(13),
        allowNull: false,
        primaryKey: true,
    },
      nombre: {
        type: Sequelize.STRING
      }
    });
  
    return Estados;
  };