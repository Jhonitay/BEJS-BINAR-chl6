const express = require('express'),
    router = express.Router(),
    controllers = require('../controllers/senimanControllers')
    multerLib = require('multer')()

router.post('/upload',  controllers.create)
router.get('/list',  controllers.getList)
router.get('/:id',  controllers.getDetail)
router.patch('/:id',  controllers.update)
router.delete('/:id',  controllers.delete)

module.exports = router