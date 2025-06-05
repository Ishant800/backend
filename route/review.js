const express = require('express')
const { accesstoken } = require('../middleware/acesstoken')
const { review, getreviews } = require('../controllers/reviewandqna')
const reviewroute = express.Router()

reviewroute.post("/review/:id",accesstoken,review)
reviewroute.get("/review/:id",accesstoken,getreviews)

module.exports = reviewroute

