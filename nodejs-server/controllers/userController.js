const userAction = require('../actions/userAction')
const {sendSuccess, sendError} = require('../utils/sendResponse')

exports.createProfile = (req, res) => {
    const args = {...req.body}
    userAction
        .createProfile(args)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.getUser = (req, res) => {
    const {id} = req.params
    const validatedID = `${id.trim()}`
    userAction
        .getUser(validatedID)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.getMatches = (req, res) => {
    userAction
        .getMatches()
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}
