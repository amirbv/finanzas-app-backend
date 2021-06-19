module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("roles", {
      IDRoles:{
        type: Sequelize.INTEGER(13),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Roles;
  };