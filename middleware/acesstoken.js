const { configDotenv } = require('dotenv')
const jwt = require('jsonwebtoken')
configDotenv()

exports.accesstoken = async (req,res,next)=>{
    try {
       const authHeader = req.headers['authorization'];   
       console.log(authHeader)    
       const token = authHeader && authHeader.split(' ')[1];
    // const token = req.cookies?.token
       if(!token) return res.status(401).json({message:"token not provided"})
        const decode = jwt.verify(token,process.env.SECRETE_KEY)
        req.user = decode
        next()
    } catch (error) {
        if(error.name === jwt.TokenExpiredError) return res.status(501).json({Message:"token expired relogin"})
        else if(error.name === jwt.JsonWebTokenError) return res.status(501).json({Message:"invalid token relogin "})
        else 
    console.error(error)
         return res.status(501).json({Message:error})
    }
}

exports.adminmiddleware = async (req,res,next) =>{
    try {
        if(!req.user) return res.status(401).json({Message:"acess denied you are not admin"})
         const admincheck = req.user
        if(!admincheck.role === "landlords") return res.status(401).json({Message:"Acess deneid"})
         
            next()    
        } catch (error) {
        return res.status(401).json({Message:"Invalid acess denied"})
    }
}

exports.usermiddleware = async (req,res,next) =>{
    try {
        if(!req.user) return res.status(401).json({Message:"acess denied you are not admin"})
         const admincheck = req.user
        if(!admincheck.role === "users") return res.status(401).json({Message:"Acess deneid"})
         
            next()    
        } catch (error) {
        return res.status(401).json({Message:"Invalid acess denied"})
    }
}