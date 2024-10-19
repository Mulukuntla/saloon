const Expense= require("../models/Expense")

const addExpense= async (req,res,next) =>{
    
    try{
      const iid=req.body.ide;
      const expense=req.body.expense;
      const description=req.body.description;
      const category=req.body.category;
      
      console.log(iid,expense,description,category)
      var data;
      if(!iid){
        data=await Expense.create({expense:expense,description:description,category:category});

      }
      else{
        data=await Expense.create({id:iid,expense:expense,description:description,category:category});

      }
      
      
      
      
      console.log(expense,description,category)
      
      res.status(201).json({newUserDetail:data});


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
    addExpense,
    getExpense,
    deleteExpense,
    preeditExpense
}