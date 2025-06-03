const express = require('express')
const { usersignup, userlogin, profileupdate, users, getusers, mydetails } = require('../controllers/authcontrollers')
const authroute = express.Router()
const {upload} = require("../cloud/cloudinary")
const { accesstoken} = require('../middleware/acesstoken')

authroute.post("/usersignup",usersignup)
authroute.post("/userlogin",userlogin)
 authroute.post("/userupdate",accesstoken,upload.single('profile_pic'),profileupdate)

 authroute.get("/users",users)
  authroute.post("/users",getusers)
  authroute.get("/mydetails",accesstoken,mydetails)
 
module.exports = authroute    