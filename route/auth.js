const express = require('express')
const { usersignup, userlogin, profileupdate } = require('../controllers/authcontrollers')
const authroute = express.Router()


authroute.post("/usersignup",usersignup)
authroute.post("/userlogin",userlogin)
 authroute.post("/userupdate/:id",profileupdate)

module.exports = authroute