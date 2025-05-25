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
  return res.status(201).json({room:"room listed sucessfully",room})

} catch (error) {
console.log(error)
return res.status(501).json({error:"internal server error"})
}
}

 
exports.roomupdate = async(req,res)=>{
    try {
        const token = req.cookies.token
        if(!token) return res.status(401).json({error:"token not provided"})

       const id = req.params.id;

    await Room.update({...req.body}, {
      where: { roomid: id }
     
    });
    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
    
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
      where:{
        roomid:id
      }
    })
  if(!existroom) return res.status(401).json({Message:"room not found"})

  await Room.destroy({where:{
    roomid:id
  }})

  return res.status(200).json({Message:"room deleted sucessfully"})

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