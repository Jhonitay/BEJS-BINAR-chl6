const ImageKit = require('imagekit')

module.exports={
    imageKit:new ImageKit({
        privateKey : process.env.IMAGEKIT_SECRET_KEY,
        publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
        urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
    })
}