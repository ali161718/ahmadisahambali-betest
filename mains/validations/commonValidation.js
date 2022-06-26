const resMessage = require('../helpers/resMessage');

const isValidPayload = (payload, model) => {

    const { value, error } = model.validate(payload)

    if (error) {
        error.message = error.message.replace(/"/g, '')
        return resMessage.error(error.message, '404')
    }

    return resMessage.dataRaw(value)
}

module.exports = { isValidPayload }