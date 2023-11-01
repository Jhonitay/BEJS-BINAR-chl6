const express = require('express'),
    router = express.Router(),
    controllers = require('../controllers/productController')
    multerlib = require('multer')()

router.post('/upload', multerlib.single('image'), controllers.createproduct)
router.get('/list', controllers.getListproduct)
router.get('/:id',controllers.getDetailproduct)
router.patch('/:id', controllers.editData)
router.delete('/:id', controllers.deleteData)

module.exports = router