const jwt = require('jsonwebtoken');
require('dotenv').config();

const resMessage = require('./resMessage');

let genToken = async (payload) => {
    return jwt.sign(payload, process.env.secret_token, { expiresIn: '3h' })
}

let bearerToken = (payload) => {
    if (payload.authorization) {
        return payload.authorization.split(' ')[1]
    }
    return resMessage.error('Invalid token', '400')
}

let getToken = async (req, res, next) => {

    let authHeader = req.headers;
    const token = bearerToken(authHeader)

    if (token.err) return resMessage.response(res, 'fail', token, 'Invalid token')


    try {
        await jwt.verify(token, process.env.secret_token)
    } catch (error) {

        error.code = '403'

        if (error instanceof jwt.TokenExpiredError) {
            return resMessage.response(res, 'fail', error, 'Access token expired',)
        }
        return resMessage.response(res, 'fail', error, 'Invalid Token',)

    }

    next()

}

module.exports = { genToken, getToken }