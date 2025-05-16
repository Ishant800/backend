const express = require('express')
const { usersignup, userlogin } = require('../controllers/authcontrollers')
const authroute = express.Router()


authroute.post("/usersignup",usersignup)
authroute.post("/userlogin",userlogin)
 

module.exports = authroute