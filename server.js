const { configDotenv } = require('dotenv')
const express = require('express')
const db = require('./databaseconf/database')
const app = express()
configDotenv()


//database integration
db

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
}) 