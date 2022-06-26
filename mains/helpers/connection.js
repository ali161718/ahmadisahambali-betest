const mongodb = require('mongodb').MongoClient;
const redis = require("redis");

const resMessage = require('./resMessage');

const portRedis = process.env.PORT_REDIS || 6379;
const redis_ahmadisahambali_betest = redis.createClient(portRedis);
redis_ahmadisahambali_betest.connect();


const getConnection = async (config) => {

    const options = {
        MaxPoolSize: 50,
        socketTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try {
        const connection = await mongodb.connect(config, options);
        return resMessage.dataRaw(connection);
    } catch (err) {
        return resMessage.error(err.message, '500');
    }

};

module.exports = { getConnection, redis_ahmadisahambali_betest }