const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { configDotenv } = require("dotenv");
const { User, UserDetails } = require("../models/auth");
configDotenv();

exports.usersignup = async (req, res) => {
  try {
    console.log("Request Body:", req.body); 
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(401).json({ error: "All fields are mandatory" });

    const userexists = await User.findOne({ where: { email } });
    if (userexists) return res.status(401).json({ error: "User already exists" });

    const hashedpassword = await bcrypt.hash(password, 8);

    await User.create({
      username,
      email,
      password: hashedpassword,
      role:req.body.role
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.userlogin = async (req, res) => {
  try {
    console.log("Request Body:", req.body); 
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(401).json({ error: "All fields are mandatory" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "User not found" });

    const passwordmatch = await bcrypt.compare(password, user.password);
    if (!passwordmatch) return res.status(401).json({ error: "Password not matched" });


    const token = jwt.sign({
      id:user.userid,role:user.role,username:user.username,email:user.email
    },process.env.SECRETE_KEY,{expiresIn:'7d'})

    const acesstoken = jwt.sign({
      id:user.userid,role:user.role,username:user.username,email:user.email
    },process.env.SECRETE_KEY,{expiresIn:'7d'})

     

    return res.status(200).cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).json({ acesstoken });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.profileupdate = async(req,res)=>{
    try {
      const userId = req.user.id
       if(!userId) return res.status(401).json({error:"missing userid"})
      
      const imagepath = req.file?.path
      if(!imagepath) return res.status(401).json({error:"image url missing"})

      
        const existsuser = await User.findOne({
    where:{
        userid:userId 
    }})

if(!existsuser) return res.status(401).json({error:"user not found"})

    const updateuser = await UserDetails.create({
        userid:existsuser.userid,profile_pic_url:imagepath,...req.body
    })

if(updateuser)
    return res.status(201).json({"message":"user update sucessfully"})


     } catch (error) {
        console.log(error)
        return res.status(500).json({error:"internal server error"})
    }
}