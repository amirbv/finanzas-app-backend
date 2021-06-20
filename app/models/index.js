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

db.user = require("../models/users.model.js")(sequelize, Sequelize);
db.role = require("../models/roles.model.js")(sequelize, Sequelize);
db.state = require("../models/states.model.js")(sequelize, Sequelize);

db.role.hasMany(db.user,{ as: "users"});
db.state.hasMany(db.user, {as: "users"});

db.user.belongsTo(db.role, {
    foreignKey: "roleIDRoles",
    as: "Role"
});

db.user.belongsTo(db.state, {
    foreignKey: "stateIDStates",
    as: "State"
});

module.exports = db;