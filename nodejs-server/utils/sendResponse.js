exports.sendSuccess = (req, res) => data => {
    res.status(200).json({
        success: true,
        data,
    })
}

exports.sendError = (req, res) => error => {
    res.status(400).json({
        success: false,
        message: error.message || error,
    })
}
