const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/create-profile', userController.createProfile)
router.get('/get-user/:id', userController.getUser)
router.get('/matches/:id', userController.getMatches)

module.exports = router
