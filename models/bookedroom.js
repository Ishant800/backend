const mongoose = require("mongoose")
const bookedroomschema = new mongoose.Schema({
    roomid:{
        type:String,
        ref:"Room",
        required:true
    },
    roomname:String,
        
    roomlocation:String,
    userid:{
        type: mongoose.Schema.Types.ObjectId,

        ref:"User"     
    },
    ownerid:String,
    username:String,
        
    useremail:String,
    contactno:String,
    status:{
        type:String,
        enum:["available","booked","pending"],
        default:"available" 
    }
    
},{
    timestamps:true
})

const Roombooked = mongoose.model("Roombook",bookedroomschema)
module.exports = Roombooked