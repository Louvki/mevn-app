const success = (res, payload, status = 200) => {
    res.status(status).json({
        status: "success",
        data: payload
    });
}

const fail = (res, payload, status = 400) => {
    res.status(status).json({
        "status": "fail",
        data: payload
    });
}

const error = (res, error, status = 500) => {
    res.status(status).json({
        "status": "error",
        message: error.message
    });
}

module.exports = { success, fail, error }