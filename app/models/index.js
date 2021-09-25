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

//models
db.user = require("./users.model.js")(sequelize, Sequelize);
db.role = require("./roles.model.js")(sequelize, Sequelize);
db.state = require("./states.model.js")(sequelize, Sequelize);
db.banks = require("./banks.model.js")(sequelize, Sequelize);
db.currencyType = require("./currencyTypes.model.js")(sequelize, Sequelize);
db.countries = require("./countries.model.js")(sequelize,Sequelize);
db.wallets = require("./wallets.model.js")(sequelize, Sequelize);
db.options = require("./options.model.js")(sequelize,Sequelize);
db.movementType = require("./movementType.model.js")(sequelize, Sequelize);
db.conversionRate = require("./conversionRate.model.js")(sequelize, Sequelize);
db.movements = require("./movements.model.js")(sequelize, Sequelize);

//Associations
db.role.hasMany(db.user,{ as: "users"});
db.state.hasMany(db.user, {as: "users"});

db.countries.hasMany(db.banks, {as: "banks"});

db.user.hasMany(db.wallets, {as: "wallets"});
db.banks.hasMany(db.wallets, {as: "wallets"});
db.currencyType.hasMany(db.wallets, {as: "wallets"});

db.options.hasMany(db.movements, {as: "movements"});
db.movementType.hasMany(db.movements, {as: "movements"});
db.wallets.hasMany(db.movements, {as: "movements"});
db.conversionRate.hasMany(db.movements, {as: "movements"});

db.user.belongsTo(db.role, {
    foreignKey: "roleIDRoles",
    as: "Role"
});

db.user.belongsTo(db.state, {
    foreignKey: "stateIDStates",
    as: "State"
});

db.wallets.belongsTo(db.currencyType,{
    foreignKey: "currencyTypeIDCurrencyType",
    as: "CurrencyType"
});

db.banks.belongsTo(db.countries,{
    foreignKey: "countryIDCountries",
    as: "Countries"
});

db.wallets.belongsTo(db.banks,{
    foreignKey: "bankIDBank",
    as: "Banks"
});

db.wallets.belongsTo(db.user, {
    foreignKey: "userIDUsers",
    as: "User"
});

db.movements.belongsTo(db.options, {
    foreignKey: "optionIDOptions",
    as: "Options"
});

db.movements.belongsTo(db.movementType, {
    foreignKey: "movementTypeIDMovementType",
    as: "MovementTypes"
});

db.movements.belongsTo(db.wallets, {
    foreignKey: "walletIDWallets",
    as: "Wallets"
});

db.movements.belongsTo(db.conversionRate, {
    foreignKey: "conversionRateIDConversionRate",
    as: "ConversionRates"
});

module.exports = db;