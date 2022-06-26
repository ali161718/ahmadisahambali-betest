const dataRaw = data => ({ err: null, data });

const error = (err, code) => ({ code, err, data: null });

const response = (res, type, result, message) => {

    let status = 'Success'
    let data = result.data;
    let code = 200

    if (type == 'fail') {
        status = 'Error'
        data = '';
        message = result.err || message || "error"
        code = result.code || 404
    }

    res.send(
        {
            code
            , status
            , message
            , data
        }
    )

}

module.exports = {
    dataRaw
    , error
    , response
}