const express = require("express"),
  router = express.Router(),
  { product } = require("../models"),
  { imageKit } = require("../utils/imageKit");

module.exports = {
  createproduct: async (req, res) => {
    try {
      const fileTostring = req.file.buffer.toString("base64");

      const uploadFile = await imageKit.upload({
        fileName: req.file.originalname,
        file: fileTostring,
      });

      const data = await product.create({
        data: {
          judul: req.body.judul,
          image: uploadFile.url,
          description: req.body.description,
          harga: parseInt(req.body.harga),
          seniman_id: parseInt(req.body.seniman_id),
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

  getListproduct: async (req, res) => {
    try {
      const data = await product.findMany();

      const detailData = data.map((data) => {
        return {
          id: data.id,
          judul: data.judul,
          image: data.image,
          description: data.description,
          harga: data.harga,
        };
      });

      if (!detailData) {
        return res.status(200).json({
          message: "Sorry, no results found for this search",
        });
      } else {
        return res.status(200).json({
          detailData,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: error,
      });
    }
  },

  getDetailproduct: async (req, res) => {
    const parameter = parseInt(req.params.id, 10);
    try {
      const data = await product.findFirst({
        where: {
          id: parameter,
        },
        include: {
          seniman: true,
        },
      });

      if (!data) {
        return res.status(200).json({
          message: "Sorry, no results found for this search",
        });
      } else {
        return res.status(200).json({
          data,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
      });
    }
  },

  editData: async (req, res) => {
    const parameter = parseInt(req.params.id, 10);
    const { judul, description } = req.body;
    const harga = parseInt(req.body.harga);
    try {
      const data = await product.findFirst({where: {id: parameter}});

      if (!data) {
        return res.status(401).json({
          msg: "id not found"
        });
      }

      await product.update({
        where: {id: parameter },
        data: {
          judul,
          description,
          harga,
        },
      });
      const Data = await product.findFirst({where: {id: parameter}});

      return res.status(200).json({
        msg: "editing success",
        data: Data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
      });
    }
  },

  deleteData: async (req, res) => {
    const parameter = parseInt(req.params.id, 10);
    try {
      const data = await product.findUnique({
        where: {
          id: parameter,
        },
      });
      if (data) {
        const url = data.image;
        const name = url.split("binarNitay/")[1];

        const image = await imageKit.listFiles({
          searchQuery: `name = ${name}`,
        });

        await imageKit.deleteFile(image[0].fileId);
        await product.delete({
          where: {
            id: parameter,
          },
        });

        return res.status(200).json({
          msg: "delete success",
        });
      }
      return res.status(401).json({
        msg: "id not found",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
      });
    }
  },
};
