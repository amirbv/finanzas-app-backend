module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      IDRoles:{
        type: Sequelize.INTEGER(13),
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING
      }
    });
  
    return Role;
  };