const { configDotenv } = require('dotenv')
const mongoose = require('mongoose')
configDotenv()
const curl = process.env.DATABASE_URL
const db = async()=>{
    try {
        await mongoose.connect(curl)
console.log("mongoose connected sucessfully")

    } catch (error) {
      console.log(error)  
    }
        
  
}

module.exports = db
