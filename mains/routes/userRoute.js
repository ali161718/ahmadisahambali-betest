const commonValidation = require('../validations/commonValidation');
const userHandler = require('../modules/handlers/userHandler');
const userModel = require('../modules/models/userModel');
const resMessage = require('../helpers/resMessage');
const { redis_ahmadisahambali_betest } = require('../helpers/connection');

let user = {

    postUser: async (req, res) => {

        let payload = req.body;

        let validPayload = commonValidation.isValidPayload(payload, userModel.postUser)

        let postRequest = async result => {
            if (result.err) return result;

            return userHandler.postUser(result.data);

        }

        let sendResponse = result => {
            result.data = ''
            result.err ? resMessage.response(res, 'fail', result, 'Register Failed')
                : resMessage.response(res, 'success', result, 'Register Success')
        }

        sendResponse(await postRequest(validPayload))

    },

    postLogin: async (req, res) => {

        let payload = req.body

        let validPayload = commonValidation.isValidPayload(payload, userModel.postLogin)

        let postRequest = async result => {
            if (result.err) return result;

            return userHandler.postLogin(result.data);

        }

        let sendResponse = result => {
            result.err ? resMessage.response(res, 'fail', result, 'Login Failed')
                : resMessage.response(res, 'success', result, 'Login Success')
        }

        sendResponse(await postRequest(validPayload))

    },

    putUser: async (req, res) => {

        let payload = req.body

        let validPayload = commonValidation.isValidPayload(payload, userModel.postUser)

        let postRequest = async result => {
            if (result.err) return result;

            return userHandler.putUser(result.data);

        }

        let sendResponse = result => {
            result.data = ''
            result.err ? resMessage.response(res, 'fail', result, 'Edit User Failed')
                : resMessage.response(res, 'success', result, 'Edit User Success')
        }

        sendResponse(await postRequest(validPayload))

    },

    deleteUserById: async (req, res) => {

        let payload = req.params.id

        let validPayload = commonValidation.isValidPayload(payload, userModel.valueValidation)

        let postRequest = async result => {
            if (result.err) return result;

            return userHandler.deleteUserById(result.data);

        }

        let sendResponse = result => {
            result.data = ''
            result.err ? resMessage.response(res, 'fail', result, 'Delete User Failed')
                : resMessage.response(res, 'success', result, 'Delete User Success')
        }

        sendResponse(await postRequest(validPayload))

    },

    getUserById: async (req, res) => {

        let payload = req.params.id

        let validPayload = commonValidation.isValidPayload(payload, userModel.valueValidation)

        let postRequest = async result => {
            if (result.err) return result;

            return userHandler.getUserById(result.data);

        }

        let sendResponse = result => {
            result.err ? resMessage.response(res, 'fail', result, 'Get User Failed')
                : resMessage.response(res, 'success', result, 'Get User Success')
        }

        sendResponse(await postRequest(validPayload))

    },

    getAccountNumber: async (req, res) => {

        let payload = req.params.accountNumber

        let validPayload = commonValidation.isValidPayload(payload, userModel.valueValidation)

        let postRequest = async result => {
            if (result.err) return result;

            return userHandler.getAccountNumber(result.data);

        }

        let sendResponse = result => {
            result.err ? resMessage.response(res, 'fail', result, 'Get User Account Number Failed')
                : resMessage.response(res, 'success', result, 'Get User Account Number Success')
        }

        sendResponse(await postRequest(validPayload))

    },

    getIdentityNumber: async (req, res) => {

        let payload = req.params.identityNumber

        let validPayload = commonValidation.isValidPayload(payload, userModel.valueValidation)

        let postRequest = async result => {
            if (result.err) return result;

            return userHandler.getIdentityNumber(result.data);

        }

        let sendResponse = result => {
            result.err ? resMessage.response(res, 'fail', result, 'Get User Identity Number Failed')
                : resMessage.response(res, 'success', result, 'Get User Identity Number Success')
        }

        sendResponse(await postRequest(validPayload))

    },

    getRedisUserById: async (req, res, next) => {

        let id = req.params.id

        let result = await redis_ahmadisahambali_betest.get(`${id}`)

        if (result) {
            result = JSON.parse(result);
            result.data = {
                userName: result.userName,
                accountNumber: result.accountNumber,
                emailAddress: result.emailAddress,
                identityNumber: result.identityNumber
            }

            resMessage.response(res, 'success', result, 'Get User Success')
        } else {
            next()
        }

    },

    getRedisAccountNumber: async (req, res, next) => {

        let accountNumber = req.params.accountNumber

        let result = await redis_ahmadisahambali_betest.get(`${accountNumber}`)

        if (result) {
            result = JSON.parse(result);
            result.data = {
                userName: result.userName,
                accountNumber: result.accountNumber,
                emailAddress: result.emailAddress,
                identityNumber: result.identityNumber
            }

            resMessage.response(res, 'success', result, 'Get User Account Number Success')
        } else {
            next()
        }

    },

    getRedisIdentityNumber: async (req, res, next) => {

        let identityNumber = req.params.identityNumber

        let result = await redis_ahmadisahambali_betest.get(`${identityNumber}`)

        if (result) {
            result = JSON.parse(result);
            result.data = {
                userName: result.userName,
                accountNumber: result.accountNumber,
                emailAddress: result.emailAddress,
                identityNumber: result.identityNumber
            }

            resMessage.response(res, 'success', result, 'Get User Identity Number Success')
        } else {
            next()
        }

    }

}

module.exports = user;