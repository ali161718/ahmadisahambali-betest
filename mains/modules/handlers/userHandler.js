require('dotenv').config();

const User = require('../queries/userQuery');
const Mongo = require('../../helpers/db');
const { redis_ahmadisahambali_betest } = require('../../helpers/connection');

const db = new Mongo(process.env.mongoDB)

const postUser = async payload => {

    delete payload['passwordConfirm']

    const user = new User(db);
    let result = await user.postUser(payload);

    return result
}

const postLogin = async payload => {

    const user = new User(db);
    let result = await user.postLogin(payload);

    return result;
}

const putUser = async payload => {

    if (!payload.userName) delete payload['userName']
    if (!payload.accountNumber) delete payload['accountNumber']
    if (!payload.emailAddress) delete payload['emailAddress']
    if (!payload.identityNumber) delete payload['identityNumber']
    if (!payload.password) delete payload['password']
    delete payload['passwordConfirm']

    const user = new User(db);
    let result = await user.putUser(payload);

    if (!result.err) {
        await redis_ahmadisahambali_betest.set(`${result.data.id}`, `${JSON.stringify(payload)}`)
    }

    return result
}

const deleteUserById = async payload => {

    const user = new User(db);
    let getUser = await user.getUserById(payload);

    if (getUser.data) {
        await redis_ahmadisahambali_betest.del(`${payload}`)
    }

    let result = await user.deleteUserById(payload);

    return result;
}

const getUserById = async payload => {

    const user = new User(db);
    let result = await user.getUserById(payload);


    if (result.data) {
        await redis_ahmadisahambali_betest.set(`${result.data._id}`, `${JSON.stringify(result.data)}`)
        result.data = {
            userName: result.data.userName,
            accountNumber: result.data.accountNumber,
            emailAddress: result.data.emailAddress,
            identityNumber: result.data.identityNumber
        }
    }

    return result;
}

const getAccountNumber = async payload => {

    const user = new User(db);
    let accountNumber = parseInt(payload)
    let result = await user.getUserCustom({ accountNumber });

    if (result.data) {
        await redis_ahmadisahambali_betest.set(`${result.data.accountNumber}`, `${JSON.stringify(result.data)}`)
        result.data = {
            userName: result.data.userName,
            accountNumber: result.data.accountNumber,
            emailAddress: result.data.emailAddress,
            identityNumber: result.data.identityNumber
        }
    }

    return result;
}

const getIdentityNumber = async payload => {

    const user = new User(db);
    let identityNumber = parseInt(payload)
    let result = await user.getUserCustom({ identityNumber });

    if (result.data) {
        await redis_ahmadisahambali_betest.set(`${result.data.identityNumber}`, `${JSON.stringify(result.data)}`)
        result.data = {
            userName: result.data.userName,
            accountNumber: result.data.accountNumber,
            emailAddress: result.data.emailAddress,
            identityNumber: result.data.identityNumber
        }
    }

    return result;
}


module.exports = {
    postUser
    , postLogin
    , getUserById
    , getAccountNumber
    , getIdentityNumber
    , putUser
    , deleteUserById
}