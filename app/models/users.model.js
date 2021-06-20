const bcrypt = require('bcryptjs');

module.exports = (sequelize,Sequelize) =>{
    const Users = sequelize.define("users", {
        IDUsers:{
            type: Sequelize.INTEGER(13),
            primaryKey: true,
            autoIncrement: true
        },
        fullName:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        },
        city:{
            type: Sequelize.STRING
        },
        stateIDStates:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        isBlocked:{
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        roleIDRoles:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            defaultValue: 1
        }

    });

    Users.beforeBulkUpdate(({attributes: attributes}) => {
        attributes.password = bcrypt.hashSync(attributes.password, 8);
    });
      
    return Users;
};