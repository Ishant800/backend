const express = require('express')
const { listroom, roomupdate, deleteroom, getrooms, roomdetails, properties, requestbook, updaterequest, ownersbookingrequest, getcustomers, deleteRoomAndBookings } = require('../controllers/room')
const roomrouter = express.Router()
const{upload} = require('../cloud/cloudinary')
const { accesstoken, adminmiddleware, usermiddleware } = require('../middleware/acesstoken')


roomrouter.post("/addroom",accesstoken,adminmiddleware,upload.array("images",4),listroom)
roomrouter.put("/updateroom/:id",accesstoken,adminmiddleware,upload.array("images",4),roomupdate)
roomrouter.delete("/roomdelete/:id",accesstoken,adminmiddleware,deleteroom)
roomrouter.get("/rooms",getrooms)
roomrouter.get("/rooms/:id",roomdetails)
roomrouter.get("/getproperties",accesstoken,properties)

roomrouter.post("/requestroom",accesstoken,usermiddleware,requestbook)
roomrouter.post("/updaterequest",accesstoken,adminmiddleware,updaterequest)
roomrouter.post("/getcustomersrequest",accesstoken,adminmiddleware,requestbook)
 roomrouter.get("/customers",accesstoken,adminmiddleware,getcustomers)
 roomrouter.get("/deleterequest/:id",accesstoken,adminmiddleware,deleteRoomAndBookings)
roomrouter.post("/usersbookinglist",accesstoken,adminmiddleware,ownersbookingrequest)

module.exports = roomrouter