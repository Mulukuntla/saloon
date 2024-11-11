const Razorpay=require("razorpay")
const Order=require("../models/orders")
const Expense= require("../models/Expense")
const jwt=require("jsonwebtoken")

function generateAccessToken(id,name,ispremiumuser){
    return jwt.sign({userId:id,name:name,ispremiumuser:ispremiumuser},"hi")
    
  }
  

const purchasepremium=async (req,res,next)=>{
    try{
        
        var rzp=new Razorpay({
            key_id:"rzp_test_gM54lkHEXhsDvO",
            key_secret:"0j1g3ErpySG1RDDi2aW172gL"
        })
        const amount=2500
        
        rzp.orders.create({amount,currency:'INR'},async (err,order)=>{
            console.log("Hi")
            console.log(order)
            if(err){
                throw new Error(JSON.stringify(err))
            }
            Order.create({orderid:order.id,status:"pending"})
                .then(()=>{
                    return res.status(201).json({order,key_id:rzp.key_id})
                })
                .catch(err =>{
                    
                    throw new Error(err)
                })
        })

    }
    catch(err){
        return res.status(403).json({message:"Something went wrong",error:err})

    }
}

const updatetransactionstatus=async (req,res,next)=>{
    try{
        console.log("userrrr"+req.user.id)
        const order_id=req.body.order_id
        const payment_id=req.body.payment_id
        console.log("order_id-------->"+order_id+"payment_id-------->"+payment_id)
        const order=await Order.findOne({where:{orderid:order_id}})
        const promise1=order.update({ paymentid: payment_id, status: "SUCCESSFUL",userId:req.user.id })
        const expense=await Expense.findOne({where:{id:req.user.id}})
        const promise2=expense.update({ispremiumuser:true})

        Promise.all([promise1,promise2]).then(()=>{

            res.status(202).json({success:true,message:"Transaction Successful",token:generateAccessToken(req.user.id,undefined,true)})
        })
        .catch(err =>{
            throw new Error(err)
        })
            
            
        
    }
    catch(err){
        
        return res.status(403).json({message:"Something went wrong",error:err})
    
    
    
    }
   
}

const updatetransactionstatusfailed=async (req,res,next)=>{
    try{
        console.log("paymentfailed")
        console.log("userrrr"+req.user.id)
        const order_id=req.body.order_id
        const payment_id=req.body.payment_id
        console.log("order_id-------->"+order_id+"payment_id-------->"+payment_id)
        const order=await Order.findOne({where:{orderid:order_id}})
        await order.update({paymentid: payment_id,status: "Failed",userId:req.user.id })   
        await res.status(202).json({success:true,message:"Transaction Failed"}) 
    }
    catch(err){
        
        return res.status(403).json({message:"Something went wrong",error:err})
    
    
    
    }
   
}






module.exports={
    purchasepremium,
    updatetransactionstatus,
    updatetransactionstatusfailed
}