module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: process.env.DB_NAME,
    dialect: "mysql",
    pool:{
        max: 500, //max number of connections
        min: 0,   //min number of connections
        acquire: 30000, //max time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 //max time, in milliseconds, that a connection can be idle before being released
    }
};