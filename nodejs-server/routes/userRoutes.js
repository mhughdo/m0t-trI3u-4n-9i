const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/create-profile', userController.createProfile)
router.get('/get-user/:id', userController.getUser)
router.post('/matches', userController.getMatches)

module.exports = router
