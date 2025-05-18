const { configDotenv } = require('dotenv')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} =  require('multer-storage-cloudinary')
configDotenv()


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
cloudinary,
params:{
    folder:"meroroom",
    allowed_formats:["jpeg","jpg","png","webp"],
    transformation:[{height:500,width:500,crop:"limit"}]
}
})

const upload = multer({storage})
module.exports = {upload}