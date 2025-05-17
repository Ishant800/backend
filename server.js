const { configDotenv } = require('dotenv')
const express = require('express')
const db = require('./databaseconf/database')
const app = express()
configDotenv()
const authroute = require("./route/auth")
const cookieParser = require("cookie-parser")
const cors = require('cors') 

//database integration
db 
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/auth",authroute)


//importing models 
require('./models/auth')

//for table migrates
db.sequelize.sync({alter:false}).then(()=>{
    console.log("migrate sucessfully")
})

  
const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
}) 