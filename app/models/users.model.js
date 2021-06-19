module.exports = (sequelize,Sequelize) =>{
    const Users = sequelize.define("usuarios", {
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
            type: Sequelize.BOOLEAN
        },
        IDStates:{
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
        IDRoles:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            defaultValue: 1
        }

    });

    return Users;
};