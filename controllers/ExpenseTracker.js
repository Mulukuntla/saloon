const Expense= require("../models/ExpenseTracker")
function isstringvalid(string){
    if(string.length===0 || string==undefined){
        return true
    }
    else{
        return false
    }
}

const addExpense= async (req,res,next) =>{
    try{
      const expense=req.body.expense;
      const description=req.body.description;
      const category=req.body.category;
      if(isstringvalid(expense) || isstringvalid(description) || isstringvalid(category)){
        return res.status(400).json({success:false,message:"Parameters missing"})
      }
      
      console.log(expense,description,category)
      
      
      const data=await Expense.create({expense:expense,description:description,category:category,userId:req.user.id})
      
      
      res.status(201).json({newUserDetail:data,success:true});

    } 
     

     
    catch(err){
        res.status(500).json({error:err,success:false});

      }
      
}

const getExpense=async (req,res,next)=>{
    try{
      const users= await Expense.findAll();
      console.log(users)  
      res.status(200).json({allUsers :users});
      //{where:{userId:req.user.id}}
  
    }
    catch(error){
      console.log("Get user is failing",JSON.stringify(error))
      res.status(500).json({error:error})
    }
  }

const deleteExpense= async (req,res) => {
  
      
      
    const uId=req.params.id;
    if(isstringvalid(uId)){
        return res.status(400).json({success:false,message:"not an valid id"})
    }
    Expense.destroy({where:{userId:uId,userId:req.user.id}})
    .then((noofrows)=>{
      if(noofrows===0){
        return res.status(404).json({success:false,message:"Expense doesnot belong to user"})

      }
    res.status(200).json({ide:uId,success:true,message:"deleted Successfully"});

    })
    .catch(err =>{
        res.status(500).json({error:err,success:false,message:"failed"})

    })
      
   
  }

 
    
    
module.exports={
    addExpense,
    getExpense,
    deleteExpense,
    
}