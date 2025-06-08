const express = require('express')
const { usersignup, userlogin, profileupdate, users, getusers, mydetails } = require('../controllers/authcontrollers')
const authroute = express.Router()
const {upload} = require("../cloud/cloudinary")
const { accesstoken} = require('../middleware/acesstoken')

authroute.post("/usersignup",usersignup)
.post("/userlogin",userlogin)
.post("/userupdate",accesstoken,upload.single('profile_pic'),profileupdate)
 
.get("/users",users)
.get('/users/:userid', getusers)
.get("/mydetails",accesstoken,mydetails)
 
module.exports = authroute    