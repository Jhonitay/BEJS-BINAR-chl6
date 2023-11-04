const express = require("express"),
  router = express.Router(),
  { seniman, product } = require("../models");

module.exports = {
  create: async (req, res) => {
    try {
      const data = await seniman.create({
        data: {
          name: req.body.name,
          umur: parseInt(req.body.umur),
          addres: req.body.addres,
        },
      });
      return res.status(201).json({
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
      });
    }
  },
  getList: async (req, res) => {
    try {
      const data = await seniman.findMany();
      if (!data) {
        return res.status(401).json({
          msg: "no data found",
        });
      }

      return res.status(201).json({
        msg: "succses",
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
      });
    }
  },

  getDetail : async(req,res) =>{
   try {
    const data = await seniman.findFirst({
      where:{
        id : parseInt(req.params.id) 
      },
      include:{
        product : true
      }
    })

    if (!data){
      return res.status(404).json({
        msg: "id not found"
      });
    }
    
    return res.status(200).json({
      msg : 'success',
      data : data
    })
   } catch (error) {
    console.log(error)
      return res.status(500).json({
        error : 'internal server error'
      })
   }
    
  },
  update: async (req,res) => {
    try {
    const {name,addres} = req.body
    const umur = parseInt(req.body.umur)
    const Id = parseInt(req.params.id , 10)

    const dataa = await seniman.findFirst({
      where:{
        id : Id
      }
    });
    console.log(Id)
      if (!dataa) {
        return res.status(404).json({
          msg: "id not found"
        });
      }

    const pppm =await seniman.update({
      where:{id : Id},
        data : { name,umur, addres 
        }
      
    })
    return res.status(200).json({
      msg : 'success'
    })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error : 'internal server error'
      })
    }
  },

  delete : async(req,res) => {
    try {
      const data = await seniman.findFirst({
        where:{
          id : parseInt(req.params.id)
        }
      })
      if (!data){
        return res.status(404).json({
          msg :'seniman not found'
        })
      }
      const dataProduct = await product.findMany({
        where:{
          seniman_id : data.id
        }
      })
      if (dataProduct){
        const getProduct = dataProduct.map((dataProduct) => {
          return {
            id : dataProduct.id
          }
        })
        const GetProductInt = getProduct.map((obj) => obj.id);
  
        await product.deleteMany({
          where : {
            id : {
              in :GetProductInt
            }
          }
        })
      }
      await seniman.delete({
        where :{
          id : parseInt(req.params.id)
        }
      })

      return res.status(200).json({
        msg : 'success'
      })
    }  catch (error) {
      console.log(error)
      return res.status(500).json({
        error : 'internal server error'
      })
    }
  }
}
