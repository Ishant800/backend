const { configDotenv } = require('dotenv')
const express = require('express')
const db = require('./databaseconf/database')
const app = express()
configDotenv()

const cookieParser = require("cookie-parser")
const cors = require('cors') 

//database integration
db 
app.use(express.json())
app.use(cookieParser())
app.use(cors())


const authroute = require("./route/auth")
const roomroute = require("./route/room")
app.use("/auth",authroute)
app.use('/room',roomroute)


//importing models 
require('./models/auth')
require('./models/roommodel')

//for table migrates
db.sequelize.sync({alter:false}).then(()=>{
    console.log("migrate sucessfully")
})

  
const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
}) 