const { Room } = require("../models/roommodel")

exports.listroom = async(req,res)=>{
try {
    if(!req.files)
        console.log('files not found')

const imagepath = req.files.map(file => file.path)
console.log(imagepath)
const userid = req.user.id 
console.log(userid) 
if(!userid) return res.status("user id not found")
  const room = await Room.create({
   userid:userid,images:imagepath,...req.body
  })
  return res.status(201).json({room})

} catch (error) {
console.log(error)
return res.status(501).json({error:"internal server error"})
}
}

 
exports.roomupdate = async(req,res)=>{
    try {
        if(!req.files) return res.status(401).json({message:"images not provided"})
         const imagepaths = req.files.map(file => file.path)
       const id = req.params.id;

   const room = await Room.findByIdAndUpdate( id,
    {images:imagepaths,...req.body},{ new: true });
    return res.status(200).json({
      room
    
    });

    } catch (error) {
        console.log(error)
        return res.status(501).json({error:"internal error"})
    }
}

exports.deleteroom = async (req,res)=>{
  try {
    const id = req.params.id
    const existroom = await Room.findOne({
     
        _id:id
    
    })
  if(!existroom) return res.status(401).json({Message:"room not found"})

  await Room.findByIdAndDelete(id)

  return res.status(200).json({message:"deleted sucessfully"})
  } catch (error) {
    return res.status(501).json({Message:"internal server error"})
  }
}

exports.getrooms = async (req,res)=>{
  try {
   const rooms = await Room.find()
   if(!rooms) return res.status(401).json({Message:"no rooms found"})
   return res.status(200).json({rooms})

  } catch (error) {
    console.log(error)
    return res.status(501).json({Message:"internal server error"})
  }
}

exports.roomdetails = async (req,res)=>{
  try{
    const id = req.params.id
    const existroom = await Room.findOne({_id:id})
  if(!existroom) return res.status(401).json({Message:"room not found in databases"})

   

  return res.status(200).json({existroom})

  } catch (error) {
    return res.status(501).json({Message:"internal server error"})
  }
}

exports.properties = async (req,res)=>{
  try {
    const userid = req.user.id
    const data = await Room.find({userid:userid})
    if(!data) return res.status(401).json({message:"no properties found"})
    return res.status(200).json({data})
    } catch (error) {
      console.log(error)
    return res.status(501).json({error:"internal server error"})
  }
}