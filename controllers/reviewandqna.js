const { User, UserDetails } = require("../models/auth")
const { Reviews, Qna } = require("../models/roomreview")

exports.review = async(req,res)=>{
    try {
        const roomid = req.params.id
        const {userid,comment,rating} = req.body
        if(!userid,!roomid,!comment,!rating) return res.status(200).json({warning:"all fields are necessary"})
            const review = await Reviews.create({...req.body})
        if(!review)return res.status(200).json({error:"failed to create reviews"})
        return res.status(201).json({sucess:"sucessfully created"})
    
        } catch (error) {
        return res.status(501).json({error:"internal server error"})
    }
}

exports.getreviews = async(req,res)=>{
      try {
        const roomid = req.params.id
       const reviews = await Reviews.findById(roomid)
       if(!reviews) return res.status(200).json({})
         const user = await User.findById(reviews.userid)
        if(!user) return res.status(200).json({message:"user not found"})
        const userdetails = await UserDetails.findOne({userid:user._id})
        const payload = {
            username:user.username,
            profilepic:userdetails.profile_pic_url,
            comment:reviews.comment,
            rating:reviews.rating
        }

        return res.status(200).json({payload})
    } catch (error) {
       return res.status(501).json({error:"internal server error"}) 
    }
}

exports.qna=async(req,res)=>{
    try {
        const {userid,roomid,questions} = req.body
        if(!userid,!roomid,!questions) return res.status(200).json({warning:"all fields are necessary"})
            const qna = await Qna.create({...req.body})
        if(!qna)return res.status(200).json({error:"failed to create qna"})
        return res.status(201).json({sucess:"sucessfully created"})
    
        } catch (error) {
        return res.status(501).json({error:"internal server error"})
    }
}

exports.updateqna = async (req,res)=>{
    try {
        const {qnaid,answer} = req.body
        const qnaexists = await Qna.findById(qnaid)
        if(!qnaexists) return res.status(401).json({error:"no qna found"})
        
         const updateqna = await Qna.findByIdAndUpdate(qnaid,{
         answer
         })   
         if(!updateqna) return res.status(200).json({error:"failed to update answers"})
        return res.status(201).json({sucess:"sucessfully created"})
        } catch (error) {
       return res.status(501).json({error:"internal server error"}) 
    }
}

exports.getqna = async(req,res)=>{

    try {
        const roomid = req.params.id
       const reviews = await Reviews.find({roomid:roomid})
       if(!reviews) return res.status(200).json({reviews})
        return res.status(200).json({reviews})
    } catch (error) {
       return res.status(501).json({error:"internal server error"}) 
    }
}

