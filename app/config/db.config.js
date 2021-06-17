module.exports = {
    HOST: "remotemysql.com",
    USER: "Snlv00g6PM",
    PASSWORD: "PEmLoFCpWZ",
    DB: "Snlv00g6PM",
    dialect: "mysql",
    pool:{
        max: 500, //max number of connections
        min: 0,   //min number of connections
        acquire: 30000, //max time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 //max time, in milliseconds, that a connection can be idle before being released
    }
};