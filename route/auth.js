const express = require('express')
const { usersignup, userlogin, profileupdate } = require('../controllers/authcontrollers')
const authroute = express.Router()
const {upload} = require("../cloud/cloudinary")

authroute.post("/usersignup",usersignup)
authroute.post("/userlogin",userlogin)
 authroute.post("/userupdate",upload.single('image'),profileupdate)

module.exports = authroute