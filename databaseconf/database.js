const { configDotenv } = require('dotenv')
const {Sequelize,DataTypes} = require('sequelize')
configDotenv()


//database connection string
const DBURL = process.env.DATABASE_URL
const sequelize = new Sequelize(DBURL)

sequelize.authenticate()
.then(()=>console.log("Database connected sucessfully"))
.catch((error)=>console.log(`Database connection failed due to ${error}`))

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize


db.users = require("../models/auth")(sequelize,DataTypes)


sequelize.sync({alter:false}).then(()=>{
    console.log("migrate sucessfully")
})


module.exports = db

 
