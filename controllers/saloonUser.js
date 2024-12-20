const saloonUser= require("../models/saloonUser")
const saloonService= require("../models/service")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")


function isstringinvalid(string){
  console.log(string)
  if(string.length==0){
    
    return true
  }
  else{
    return false
  }

}

const signup= async (req,res,next) =>{
    
  try{
    
    const password=req.body.password
    const saltrounds=10
    bcrypt.hash(password,saltrounds,async (err,hash)=>{
        console.log(err)
        const saloonUsers=await saloonUser.create({saloonName:req.body.name,email:req.body.gmail,password:hash,phone:req.body.phone,street:req.body.street,apartment:req.body.apartment,zip:req.body.zip,city:req.body.city,country:req.body.country,fileUrl:"https://expensetrackingapp12.s3.amazonaws.com/1734408901736-Screenshot%20%28291%29.png"})
        res.status(201).json({saloonUsers:saloonUsers})
    })
    
    
  }  
  catch(err){
    res.status(500).json(err);
  }
}


function generateAccessToken(id,name){
    return jwt.sign({saloonId:id,name:name},"hi")
    
  }
  
  const signin= async (req,res,next) =>{
      
    try{
      const email=req.body.gmail;
      const password=req.body.password;
      console.log(email)
      if( isstringinvalid(email) || isstringinvalid(password)){
       
        return res.status(400).json({message:"email or password is missing",success:false,})
      }
      const user=await saloonUser.findAll({ where: {email:email} })
        console.log(user)
        if(user.length>0){
          bcrypt.compare(password,user[0].password,(err,result)=>{
            if(err){
              throw new Error("Something went wrong")
  
            }
            if(result === true){
              return res.status(200).json({success:true,message:"User loggedin Successfully",salaryToken:generateAccessToken(user[0].id,user[0].saloonName)})
    
            }
            
            else{
              return res.status(401).json({success:false,message:"Password is incorrect"})
    
            }
        
  
          })
          
        }
    
        else{
          return res.status(404).json({success:false,message:"User not found"})
  
        }
       
    }  
    catch(err){
      res.status(500).json({message:err,success:false});
    }
  }


  const allsaloons= async (req,res,next) =>{
      
    try{
        const allsaloons=await saloonUser.findAll()
        res.status(201).json({allsaloons:allsaloons})
    }  
    catch(err){
      res.status(500).json({message:err,success:false});
    }
  }
  const getSaloon= async (req,res,next) =>{
      
    try{
      const getSaloon=await saloonService.findAll({where:{saloonId:req.params.saloonId}})
      res.status(201).json({getSaloon:getSaloon})
    }  
    catch(err){
      res.status(500).json({message:err,success:false});
    }
  }





    
module.exports={
    signup,
    signin,   
    allsaloons,
    getSaloon,
}