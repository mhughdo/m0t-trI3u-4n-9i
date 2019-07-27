const userAction = require('../actions/userAction')
const {sendSuccess, sendError} = require('../utils/sendResponse')

exports.createProfile = (req, res) => {
    const args = {...req.body}
    userAction
        .createProfile(args)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}
