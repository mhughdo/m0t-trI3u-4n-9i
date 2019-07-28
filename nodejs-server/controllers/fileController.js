const fileAction = require('../actions/fileAction')
const {sendSuccess, sendError} = require('../utils/sendResponse')

exports.uploadFile = (req, res) => {
    const {id} = req.params
    fileAction
        .uploadFile(id)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}
