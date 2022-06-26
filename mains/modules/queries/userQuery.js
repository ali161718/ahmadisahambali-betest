const objectId = require('mongodb').ObjectId;

const resMessage = require('../../helpers/resMessage');
const crypto = require('../../helpers/crypto');
const authJwt = require('../../helpers/authJwt');

class User {

    constructor(db) {
        this.db = db
    }

    async postUser(payload) {

        const { password, emailAddress } = payload;

        this.db.setCollection('users');

        let user = await this.db.findOne({ emailAddress })

        if (user.data) return resMessage.error('emailAddress registered', '400')

        let encPass = await crypto.encryptV1(password);
        payload.password = encPass

        let result = await this.db.insertOne(payload)

        return result

    }

    async postLogin(payload) {

        const { emailAddress, password } = payload

        this.db.setCollection('users');

        let user = await this.db.findOne({ emailAddress })

        if (user.err) return user

        let userPass = user.data.password
        let emailAdd = user.data.emailAddress
        let userId = user.data._id

        let decPass = await crypto.decryptV1(userPass)


        if (password !== decPass || emailAdd !== emailAddress) return resMessage.error('Wrong Password', '403')

        let token = await authJwt.genToken(payload)

        let data = { userId, token }

        return resMessage.dataRaw(data)
    }

    async putUser(payload) {

        const { password, emailAddress } = payload;

        this.db.setCollection('users');

        let user = await this.db.findOne({ emailAddress })

        if (user.err) return user

        if (password) payload.password = await crypto.encryptV1(password);
        let _id = user.data._id

        let result = await this.db.updateOne({ _id }, { $set: payload })

        result.data.id = _id

        return result

    }

    async deleteUserById(payload) {

        let cekPayload = Buffer.byteLength(payload, 'utf8')

        if (cekPayload != 24) return resMessage.error('invalid id', '400')

        const parameter = {
            _id: objectId(payload)
        }

        this.db.setCollection('users');

        let user = await this.db.findOne(parameter);

        if (user.err) return user

        const result = await this.db.deleteOne(parameter)

        return result;

    }

    async getUserById(payload) {

        let cekPayload = Buffer.byteLength(payload, 'utf8')

        if (cekPayload != 24) return resMessage.error('invalid id', '400')

        const parameter = {
            _id: objectId(payload)
        }

        this.db.setCollection('users');

        let result = await this.db.findOne(parameter);

        return result;

    }

    async getUserCustom(payload) {

        this.db.setCollection('users');

        let result = await this.db.findOne(payload);

        return result;
    }

}

module.exports = User