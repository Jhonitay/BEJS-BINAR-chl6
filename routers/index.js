const express = require('express'),
    router = express.Router(),
    product = require('./product')
    seniman = require('./seniman')

router.use('/product',product)
router.use('/seniman',seniman)

module.exports = router