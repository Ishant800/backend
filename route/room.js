const express = require('express')
const { listroom, roomupdate, deleteroom, getrooms, roomdetails, properties } = require('../controllers/room')
const roomrouter = express.Router()
const{upload} = require('../cloud/cloudinary')
const { accesstoken, adminmiddleware } = require('../middleware/acesstoken')


roomrouter.post("/addroom",accesstoken,adminmiddleware,upload.array("images",4),listroom)
roomrouter.put("/updateroom/:id",accesstoken,adminmiddleware,upload.array("images",4),roomupdate)
roomrouter.delete("/roomdelete/:id",accesstoken,adminmiddleware,deleteroom)
roomrouter.get("/rooms",getrooms)
roomrouter.get("/rooms/:id",roomdetails)
roomrouter.get("/getproperties",accesstoken,properties)

 

module.exports = roomrouter