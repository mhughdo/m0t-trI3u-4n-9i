const router = require('express').Router()
const signInController = require('../controllers/sign-in.controller')

router.post('/', signInController.greeting)

module.exports = router
