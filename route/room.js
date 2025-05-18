const express = require('express')
const { listroom, roomupdate } = require('../controllers/room')
const roomrouter = express.Router()
const{upload} = require('../cloud/cloudinary')


roomrouter.post("/addroom",upload.array("images",4),listroom)
roomrouter.post("/updateroom/:id",roomupdate)

module.exports = roomrouter