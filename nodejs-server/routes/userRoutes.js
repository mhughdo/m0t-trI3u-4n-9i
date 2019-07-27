const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/create-profile', userController.createProfile)
router.post('/matches', userController.getMatches)

module.exports = router
