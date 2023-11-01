const express = require('express'),
    router = express.Router(),
    {product} = require('../models'),
    {imageKit} = require('../utils/imageKit'),
    {PrismaClient} = require('@prisma/client'),
    prisma = new PrismaClient()

module.exports = {
    createproduct: async (req, res) => {
        try {

            const fileTostring = req.file.buffer.toString('base64');

            const uploadFile = await imageKit.upload({
                fileName : req.file.originalname,
                file : fileTostring
            });

            const data = await product.create({
                data: {
                    judul: req.body.judul,
                    image: uploadFile.url,
                    description: req.body.description,
                    harga: parseInt(req.body.harga),
                    seniman_id: parseInt(req.body.seniman_id)
                }
            });

            return res.status(201).json({
                data
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    },

    getListproduct: async (req, res) =>{
        try {
            const data = await product.findMany();

            const detailData = data.map((data)=>{
                return {
                    judul : data.judul,
                    image : data.image,
                    description : data.description
                }
            })

            if (!detailData){
                return res.status(200).json({
                    message : 'Sorry, no results found for this search'
                })
            }else{
                return res.status(200).json({
                    detailData
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    },

    getDetailproduct: async(req , res) => {
        const parameter = parseInt(req.params.id,10) 
        try {
            const data = await product.findFirst({
                where:{
                    id : parameter,

                }, 
                include:{
                    seniman: true
                }
            });

            if (!data){
                return res.status(200).json({
                    message : 'Sorry, no results found for this search'
                });
            }else{
                
                return res.status(200).json({
                    data
                })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    },

    editData : async (req, res) => {
        const parameter = parseInt(req.params.id , 10)
        const{judul , description} = req.body
        const harga = parseInt(req.body.harga)
        try {
            const data = await product.update({
                where:{
                    id : parameter
                },
                data: {
                    judul,
                    description,
                    harga
                }
            });

            return res.status(200).json({
                msg : 'editing success'
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    },

    deleteData: async(req, res) =>{
        const parameter = parseInt(req.params.id , 10)
        try {
            const data = await product.delete({
                where :{
                    id : parameter
                }
            })

            return res.status(200).json({
                msg : 'delete success'
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    }
}
