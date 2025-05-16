const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const {users } = require("../databaseconf/database")
const { configDotenv } = require("dotenv")
configDotenv()
exports.usersignup = async(req,res)=>{
try {
    const {username,email,password} = req.body
    if(!username || !email || !password) return res.status(401).json({error:"all fields are mendatory"})

        const userexists = await users.findOne({where:{email}})
        if(userexists) return res.status(401).json("users already exists")

    const hashedpassword = await bcrypt.hash(password,8)

    await users.create({
      username,
      email,
      password:hashedpassword
    })
   
    return res.status(201).json({"message":"user created sucessfully"})

    
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
    const token =  jwt.sign({id:user._id,username:user.username,email:user.email},process.env.SECRETE_KEY,{
        expiresIn:"1d"
    })

    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        expiresIn:'7 * 24 * 60 * 60 * 1000'
    }) 
    return res.status(200).json({ user });

    
} catch (error) {
    console.log(error)
    return res.status(500).json({error:"internal server error"})
}
}