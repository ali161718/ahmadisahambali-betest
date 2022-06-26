const crypto = require('crypto-js');
require('dotenv').config();

const algorithm = 'aes-256-ctr';

// let chipper =  crypto.createCipheriv(algorithm, parameter, iv);

const encryptV1 = parameter => {

    let encParam = `secret_${parameter}`
    const chipper = crypto.AES.encrypt(encParam, process.env.secret_crypto);

    return chipper.toString()

}

const decryptV1 = parameter => {

    const dechipper = crypto.AES.decrypt(parameter, process.env.secret_crypto)
    let rawChipper = dechipper.toString(crypto.enc.Utf8)

    return rawChipper.split('_')[1]

}

module.exports = { encryptV1, decryptV1 }