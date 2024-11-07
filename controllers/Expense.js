const Expense= require("../models/Expense")

const signup= async (req,res,next) =>{
    
  try{
    const name=req.body.name;
    const email=req.body.email;
    const phonenumber=req.body.number;
    var emails;
    await Expense.findByPk(email)
      .then(product =>{
        emails=product.email
        console.log("usedEmail--->"+emails)
        
      })
      .catch(err => console.log(err))
    if(emails===undefined){
      const data=await Expense.create({name:name,email:email,phonenumber:phonenumber});
      res.status(201).json({newUserDetail:data});
     

    }
    else{
      res.status(201).json({newUserDetail:undefined})
    }
     


  }  
  catch(err){
    res.status(500).json({
      error:err
    })
  }
}

const getExpense=async (req,res,next)=>{
    try{
      const users= await Expense.findAll();
      console.log(users)  
      res.status(200).json({allUsers :users});
  
    }
    catch(error){
      console.log("Get user is failing",JSON.stringify(error))
      res.status(500).json({error:error})
    }
  }

const deleteExpense= async (req,res) => {
  console.log(req.params.id)
    try{
      if(!req.params.id){
        console.log("ID is missing" == "undefined")
        return res.status(400).json({err:"Id is missing"})
      }
      
      const uId=req.params.id;
      await Expense.destroy({where:{id:uId}});
      res.status(200).json({ide:uId});
    }
    catch(err){
      console.log(err)
      res.status(500).json(err)
  
    }
  
  }

  const preeditExpense= async (req,res) => {
    const uId = req.params.id;

    try {
        const expense = await Expense.findByPk(uId);

        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        await Expense.destroy({where:{id:uId}});
        res.status(200).json({
            id: uId,
            expense: expense.expense,
            description: expense.description,
            category: expense.category,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    } 
   
  };
  
    
    
module.exports={
    signup,
    getExpense,
    deleteExpense,
    preeditExpense
}