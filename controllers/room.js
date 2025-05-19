const { Room } = require("../models/roommodel")

exports.listroom = async(req,res)=>{
try {
   
   const token = req.cookies?.token
   if(!token) return res.status(401).json({error:"token not provided"})

    if(!req.files || req.files.length === 0)
        console.log('files not found')

  const imagepath = req.files.map(file=>file.path)
  


  const room = await Room.create({
    images:imagepath,...req.body
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