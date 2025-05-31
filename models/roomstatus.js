const mongoose = require('mongoose')
const roomstatus = new mongoose.Schema({
   requestid:{
    type:String,
    ref:"Roombooked",
    required:true
   },
   roomstatus:{
    type:String,
    enum:["accepted","rejected"],
    required:true
   }
},{
    timestamps:true
})
const Roomstatus = mongoose.model("Roomstatus",roomstatus)
module.exports = Roomstatus