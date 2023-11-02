const express = require('express'),
    cors = require('cors'),
    app = new express(),
    PORT = process.env.PORT || 3000
    router = require('./routers')
    swaggerUi = require('swagger-ui-express'),
    swaggerJson = require('./documentationAPI.json'),
require('dotenv').config()

app.use(express.json({strict : false}))
app.use(cors())
app.use('/v1', router)
app.use('/documentation',swaggerUi.serve,swaggerUi.setup(swaggerJson))

app.get('/v2', (req, res) => {
    return res.status(200).json({
        msg : 'cek status cuy'
    })
})

app.get('*', (req, res) => {
    return res.status(404).json({
        error : 'endPoint tidak ditemukan'
    })
})

app.listen(PORT, ()=>{
    console.log ('SERVER BERJALAN DI PORT',PORT)
})
