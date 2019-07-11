const success = (res, payload) => {
    res.status(200).json({
        status: "success",
        data: payload
    });
}

const fail = (res, payload) => {
    res.status(400).json({
        "status": "error",
        data: payload
    });
}

const error = (res, message) => {
    res.status(500).json({
        "status": "error",
        message
    });
}

module.exports = { success, fail, error }