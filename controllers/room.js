const { User } = require("../models/auth")
const Roombooked = require("../models/bookedroom")
const { Room } = require("../models/roommodel")

const sendEmail = require("../utility/email")

exports.listroom = async (req, res) => {
  try {
    if (!req.files)
      console.log('files not found')

    const imagepath = req.files.map(file => file.path)
    console.log(imagepath)
    const userid = req.user.id
    console.log(userid)
    if (!userid) return res.status("user id not found")
    const room = await Room.create({
      userid: userid, images: imagepath, ...req.body
    })
    return res.status(201).json({ room })

  } catch (error) {
    console.log(error)
    return res.status(501).json({ error: "internal server error" })
  }
}


exports.roomupdate = async (req, res) => {
  try {
    if (!req.files) return res.status(401).json({ message: "images not provided" })
    const imagepaths = req.files.map(file => file.path)
    const id = req.params.id;

    const room = await Room.findByIdAndUpdate(id,
      { images: imagepaths, ...req.body }, { new: true });
    return res.status(200).json({
      room

    });

  } catch (error) {
    console.log(error)
    return res.status(501).json({ error: "internal error" })
  }
}

exports.deleteroom = async (req, res) => {
  try {
    const id = req.params.id
    const existroom = await Room.findOne({

      _id: id

    })
    if (!existroom) return res.status(401).json({ Message: "room not found" })

    await Room.findByIdAndDelete(id)

    return res.status(200).json({ message: "deleted sucessfully" })
  } catch (error) {
    return res.status(501).json({ Message: "internal server error" })
  }
}

exports.getrooms = async (req, res) => {
  try {
    const rooms = await Room.find()
    if (!rooms) return res.status(401).json({ Message: "no rooms found" })
    return res.status(200).json({ rooms })

  } catch (error) {
    console.log(error)
    return res.status(501).json({ Message: "internal server error" })
  }
}

exports.roomdetails = async (req, res) => {
  try {
    const id = req.params.id
    const existroom = await Room.findOne({ _id: id })
    if (!existroom) return res.status(401).json({ Message: "room not found in databases" })

    return res.status(200).json({ existroom })

  } catch (error) {
    return res.status(501).json({ Message: "internal server error" })
  }
}

exports.properties = async (req, res) => {
  try {
    const userid = req.user.id


    const data = await Room.find({ userid: userid })

    if (!data || data.length === 0) return res.status(401).json({ message: "no properties found" })
    return res.status(200).json({ data })
  } catch (error) {
    console.log(error)
    return res.status(501).json({ error: "internal server error" })
  }
}

exports.requestbook = async (req, res) => {
  try {
    const id = req.user.id
    const { ownerid, roomid } = req.body
    const user = await User.findById(id)
    const owner = await User.findById(ownerid)
    const room = await Room.findById(roomid)
    const data = await Roombooked.create({
      ownerid,
      roomname: room.roomtitle,
      roomlocation: room.location,
      username: user.username,
      useremail: user.email,
      roomid})
      

      if (!data) {
      return res.status(401).json({ Error: "failed to request" })}
     await sendEmail({
      to: user.email,
      subject: "Your Room Booking Request is Received!",
      html: `
        <h2>Booking Confirmation</h2>
        <p>Dear customers,</p>
        <p>Thank you for requesting <strong>${room.roomtitle}</strong>.</p>
        <p> Location :${room.location} </p>
        <p>We will notify you once the landlord responds.</p>
        <br/>
        <p>— MeroRoom Team</p>
      `,
    })


    await sendEmail({
      to: owner.email,
      subject: `"Waiting For Your Response!"`,
      html: `<h2>Booking Confirmation</h2>
      <p>Dear landlords</p>
      <p>Somone want to buy your properties <strong>${room.roomtitle}</strong>
       </p> 
       <p> Location :${room.location} </p>
       <p>Please Responsed Back Fast</p>
        <br/>
        <p>— MeroRoom Team</p>`
    })
    return res.status(200).json({ Message: "request sucessfully waiting for owners actions" })

  } catch (error) {
    console.log(error)
    return res.status(501).json({ Error: "internal server error" })
  }
}

exports.deleteRoomAndBookings = async (req, res) => {
  try {
    const { id } = req.params;
    await Roombooked.findOneAndDelete(id)

    return res.status(200).json({ message: "Room and bookings deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.updaterequest = async (req, res) => {
  try {
    const userid = req.user.id

    const { id, status, roomid, roomstatus } = req.body
    if(roomstatus === "reject"){
      await Roombooked.findByIdAndDelete(id)
      return res.status(200)
    }
    else{
           const existroom = await Room.findById(roomid)
    if (!existroom) return res.status(403).json({ Error: "Room not find" })
    const user = await User.findById(userid)


    const update = await Roombooked.findByIdAndUpdate(id, {
      roomstatus
    })

    await Room.findByIdAndUpdate(roomid, {
      status
    })

    await sendEmail({
      to: user.email,
      subject: "Room Booked Confirm!",
      html: `
        <h2>Booking Confirm</h2>
        <p>Dear customers,</p>
        <p> Congratulations, Your request has been accept sucessfully by properties owner.</p>
         <p> Now you are the owner of that properties formore info visit our sites with your account </p>
         <p>Thankyou for trusting us.</p>
        
        <br/>
        <p>— MeroRoom Team</p>
      `,

    })


    if (!update) 
     
      return res.status(401).json({ Error: "failed to action perform" })

    console.log("all test passed")
    return res.status(200).json({ Message: "Sucessfully perform action" })


    }
    
   
  } catch (error) {
    console.log(error)
    return res.status(501).json({ Error: "internal server error" })
  }
}


exports.ownersbookingrequest = async (req, res) => {
  try {
    const ownersid = req.user.id
    const data = await Roombooked.find({ ownerid: ownersid })

    if (!data || data.length === 0) return res.status(401).json({ message: "no properties found" })
    return res.status(200).json({ data })
  } catch (error) {
    console.log(error)
    return res.status(501).json({ error: "internal server error" })
  }
}

exports.getcustomers = async (req, res) => {
  try {
    const {id} = req.user.id
    const requestdata = await Roombooked.find({ownerid:id})
   console.log(requestdata)
    return res.status(200).json({ requestdata })
  } catch (error) {
    console.log(error)
    return res.status(501).json({ error: "internal server error" })
  }
}