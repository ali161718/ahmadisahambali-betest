const joi = require('joi')

const postUser = joi.object({

    userName: joi.string().min(3)
        .regex(/[-();:]/, { invert: true })
        .required(),
    accountNumber: joi.number()
        .required(),
    emailAddress: joi.string().email({ tlds: { allow: ['com', 'net'] } })
        .regex(/[-();:]/, { invert: true })
        .required(),
    identityNumber: joi.number()
        .required(),
    password: joi.string().min(6)
        .regex(/[-();:]/, { invert: true })
        .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%])/)
        .required(),
    passwordConfirm: joi.ref('password')

})

const postLogin = joi.object({

    emailAddress: joi.string().email({ tlds: { allow: ['com', 'net'] } })
        .regex(/[-();:]/, { invert: true })
        .required(),
    password: joi.string().min(6)
        .regex(/[-();:]/, { invert: true })
        .required(),
})

const valueValidation = joi.string()
    .regex(/[-();:]/, { invert: true })

module.exports = { 
    postUser
    , postLogin 
    , valueValidation
}