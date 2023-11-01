const express = require('express'),
    router = express.Router(),
    controllers = require('../controllers/senimanControllers')
    multerLib = require('multer')()

router.post('/upload',  controllers.create)

module.exports = router