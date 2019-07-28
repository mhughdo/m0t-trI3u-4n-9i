const router = require('express').Router()
const fileController = require('../controllers/fileController')

router.get('/upload/:id', fileController.uploadFile)

module.exports = router
