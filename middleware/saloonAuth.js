const jwt=require("jsonwebtoken")
const User=require("../models/saloonUser")

const authenticate=(req,res,next)=>{
    try{
        const token=req.header("authorization")
        console.log(token)
        const user =jwt.verify(token,"hi")
        console.log("user------>"+user.saloonId)
        User.findByPk(user.saloonId).then(user =>{
            
            req.saloon=user
            next()

        }).catch(err =>{
            throw new Error(err)
        })
    }
    catch(err){
        console.log(err)
        return res.status(401).json({success:false})

    }
}

module.exports={
    authenticate
}