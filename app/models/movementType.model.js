module.exports = (sequelize, Sequelize) => {
    const MovementType = sequelize.define("movementTypes", {
      IDMovementType:{
        type: Sequelize.INTEGER(13),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return MovementType;
  };