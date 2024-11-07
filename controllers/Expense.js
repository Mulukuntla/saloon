const Expense= require("../models/Expense")
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
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    console.log(name,email,password)
    if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password)){
      console.log("Hi")
      return res.status(400).json({err:"Bad parameters - Something is missing"})
    }
    await Expense.create({userName:name,email:email,password:password})
    
    res.status(201).json({message:"Successfully created a new user"})
    
  }  
  catch(err){
    res.status(500).json(err);
  }
}


const signin= async (req,res,next) =>{
    
  try{
    const email=req.body.email;
    const password=req.body.password;
   
    const user = await Expense.findOne({ where: { email: email } });
    console.log("user----------->"+user)
    if(user==null){
      return res.status(404).json({message:"User not found"})

    }  
    if (user.email==email && user.password==password){
      console.log("Hi")
      return res.status(200).json({message:"Successfully created a new user"})
    
    }
    if (user.email==email && user.password != password){
      res.status(401).json({message:"User not authorized"})
    } 
    
   
    
  }  
  catch(err){
    res.status(500).json(err);
  }
}




    
module.exports={
    signup,
    signin
    
}