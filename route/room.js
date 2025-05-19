const express = require('express')
const { listroom, roomupdate, deleteroom } = require('../controllers/room')
const roomrouter = express.Router()
const{upload} = require('../cloud/cloudinary')
const { accesstoken, adminmiddleware } = require('../middleware/acesstoken')


roomrouter.post("/addroom",accesstoken,adminmiddleware,upload.array("images",4),listroom)
roomrouter.post("/updateroom/:id",accesstoken,adminmiddleware,roomupdate)
roomrouter.delete("/roomdelete/:id",accesstoken,adminmiddleware,deleteroom)
module.exports = roomrouter