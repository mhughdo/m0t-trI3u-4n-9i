const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/create-profile', userController.createProfile)

module.exports = router
