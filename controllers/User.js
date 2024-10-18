const User= require("../models/User")

const addUser= async (req,res,next) =>{
    
    try{
      const name=req.body.name;
      const email=req.body.email;
      const phonenumber=req.body.number;
    
      console.log(name,email,phonenumber)
      const data=await User.create({name:name,email:email,phonenumber:phonenumber});
      console.log(name,email,phonenumber)
      console.log("data"+data)
      res.status(201).json({newUserDetail:data});


    }  
    catch(err){
      res.status(500).json({
        error:err
      })
    }
}

const getUser=async (req,res,next)=>{
    try{
      const users= await User.findAll();
      console.log(users)  
      res.status(200).json({allUsers :users});
  
    }
    catch(error){
      console.log("Get user is failing",JSON.stringify(error))
      res.status(500).json({error:error})
    }
  }

const deleteUser= async (req,res) => {
  console.log(req.params.id)
    try{
      if(!req.params.id){
        console.log("ID is missing" == "undefined")
        return res.status(400).json({err:"Id is missing"})
      }
      const uId=req.params.id;
      await User.destroy({where:{id:uId}});
      res.status(200).json({ide:uId});
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
  
    }
  
  }
module.exports={
    addUser,
    getUser,
    deleteUser
}