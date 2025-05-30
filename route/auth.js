const express = require('express')
const { usersignup, userlogin, profileupdate, users, getusers } = require('../controllers/authcontrollers')
const authroute = express.Router()
const {upload} = require("../cloud/cloudinary")
const { accesstoken} = require('../middleware/acesstoken')

authroute.post("/usersignup",usersignup)
authroute.post("/userlogin",userlogin)
 authroute.post("/userupdate",accesstoken,upload.single('image'),profileupdate)

 authroute.get("/users",users)
  authroute.post("/users",getusers)
 
module.exports = authroute    