const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    define: {
        timestamps: false
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/usuarios.model.js")(sequelize, Sequelize);
db.role = require("../models/roles.model.js")(sequelize, Sequelize);
db.state = require("../models/estados.model.js")(sequelize, Sequelize);

db.role.hasMany(db.user,{ as: "usuarios"});
db.state.hasMany(db.user, {as: "usuarios"});

db.user.belongsTo(db.role, {
    foreignKey: "roleIDRoles",
    as: "roles"
});

db.user.belongsTo(db.state, {
    foreignKey: "estadoIDestados",
    as: "estados" 
});

module.exports = db;