module.exports = (sequelize, Sequelize) => {
    const States = sequelize.define("states", {
    IDStates:{
        type: Sequelize.INTEGER(13),
        primaryKey: true,
    },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return States;
  };
