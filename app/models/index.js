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

db.banks = require("../models/banks.model.js")(sequelize, Sequelize);
db.currencyType = require("../models/currencyTypes.model.js")(sequelize, Sequelize);
db.countries = require("../models/countries.model.js")(sequelize,Sequelize);

db.role.hasMany(db.user,{ as: "users"});
db.state.hasMany(db.user, {as: "users"});

db.currencyType.hasMany(db.banks, {as: "banks"});
db.countries.hasMany(db.banks, {as: "banks"});

db.user.belongsTo(db.role, {
    foreignKey: "roleIDRoles",
    as: "Role"
});

db.user.belongsTo(db.state, {
    foreignKey: "stateIDStates",
    as: "State"
});

db.banks.belongsTo(db.currencyType,{
    foreignKey: "currencyTypeIDCurrencyTypes",
    as: "CurrencyTypes"
});

db.banks.belongsTo(db.countries,{
    foreignKey: "countriesIDCountries",
    as: "Countries"
});

module.exports = db;