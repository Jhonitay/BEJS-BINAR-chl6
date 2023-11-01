const express = require('express'),
    router = express.Router(),
    {seniman} = require('../models')

    module.exports = {
        create: async (req, res) => {
            try {
                const data = await seniman.create({
                    data: {
                        name: req.body.name,
                        umur: parseInt(req.body.umur),
                        addres: req.body.addres,
                        
                    }
                })
    
                return res.status(201).json({
                    data
                });
    
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    error
                });
            }
        }
    }

