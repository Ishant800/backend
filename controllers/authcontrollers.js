const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const {users } = require("../databaseconf/database")
const { where } = require("sequelize")

exports.usersignup = async(req,res)=>{
try {
    const {username,email,password} = req.body
    if(!username || !email || !password) return res.status(401).json({error:"all fields are mendatory"})
    
    const hashedpassword = await bcrypt.hash(password,8)

    const user = await users.create({
      username,
      email,
      password:hashedpassword
    })
    const token =  jwt.sign({id:user._id,username:user.username,email:user.email},"secretekey",{
        expiresIn:"1d"
    })

    return res.status(201).cookie("token",token,{
        httpOnly:true
    }) .json({ message: "User created successfully", user });

    
} catch (error) {
    console.log(error)
    return res.status(500).json({error:"internal server error"})
}
}

exports.userlogin = async(req,res)=>{
try {
    const {email,password} = req.body
    if(!email || !password) return res.status(401).json({error:"all fields are mendatory"})
    
        //check user exists or not
    const user = await users.findOne({where:{email}})
    if(!user) return res.status(401).json({error:"user not found"})
    
        //matched password
    const passwordmatch = await bcrypt.compare(password,user.password)
    if(!passwordmatch) return res.status(401).json({error:"password not matched"})
    
    //token create
    const token =  jwt.sign({id:user._id,username:user.username,email:user.email},"secretekey",{
        expiresIn:"1d"
    })

    return res.status(201).cookie("token",token,{
        httpOnly:true
    }) .json({ message: "user login successfully", user });

    
} catch (error) {
    console.log(error)
    return res.status(500).json({error:"internal server error"})
}
}