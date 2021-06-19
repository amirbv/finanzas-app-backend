module.exports = (sequelize,Sequelize) =>{
    const Usuarios = sequelize.define("usuarios", {
        IDUsuarios:{
            type: Sequelize.INTEGER(13),
            primaryKey: true,
            autoIncrement: true
        },
        nombreCompleto:{
            type: Sequelize.STRING
        },
        correo:{
            type: Sequelize.STRING
        },
        clave:{
            type: Sequelize.STRING
        },
        ciudad:{
            type: Sequelize.BOOLEAN
        },
        estadoIDestados:{
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

    return Usuarios;
};