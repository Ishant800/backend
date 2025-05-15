const { configDotenv } = require('dotenv')
const express = require('express')
const db = require('./databaseconf/database')
const app = express()
configDotenv()
const authroute = require("./route/auth")
const cookieParser = require("cookie-parser")

//database integration
db
app.use(express.json())
app.use(cookieParser())

app.use("/auth",authroute)


const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
}) 