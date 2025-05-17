const { configDotenv } = require('dotenv')
const {Sequelize} = require('sequelize')
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
 

module.exports = db

 
