const { configDotenv } = require('dotenv')
const express = require('express')
const db = require('./databaseconf/database')
const app = express()
configDotenv()

const cookieParser = require("cookie-parser")
const cors = require('cors') 
app.use(express.json()) 
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,             
}));


const authroute = require("./route/auth")
const roomroute = require("./route/room")
const qnaroute = require('./route/qnaroute')
const reviewroute = require('./route/review')

app.use("/auth",authroute) 
app.use('/room',roomroute)
app.use('/Qna',qnaroute)
app.use('/reviw',reviewroute)

//database calling
db()
  
const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})   