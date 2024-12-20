const Razorpay=require("razorpay")
const jwt=require("jsonwebtoken")
const booking= require("../models/saloonbooking")
const service= require("../models/service")

  

const purchase=async (req,res,next)=>{
    try {
        console.log(req.params.bookingId)
        const bookings=await booking.findOne({where:{id:req.params.bookingId}})
        const services=await service.findOne({where:{id:bookings.serviceId}})
        const amount=services.price*100
        console.log(amount)
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                console.log(err)
                throw new Error(err);
            }
            bookings.update({status:"pending"}).then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
       
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Sometghing went wrong', error: err})
    }
}

const updatetransactionstatus=async (req,res,next)=>{
    try{
        const order_id=req.body.order_id
        const payment_id=req.body.payment_id
        const bookingId=req.params.bookingId
        console.log(order_id,payment_id,bookingId)
        
        const bookings=await booking.findOne({where:{id:bookingId}})
        const payment=await bookings.update({status:payment_id})
        res.status(201).json({bookings:payment})
        
    }
    catch(err){
        
        return res.status(403).json({message:"Something went wrong",error:err})
    
    
    
    }
   
}

const updatetransactionstatusfailed=async (req,res,next)=>{
    try{
        const bookingId=req.params.bookingId
 
        const bookings=await booking.findOne({where:{id:bookingId}})
        const payment=await bookings.update({status:"retry"})
        res.status(201).json({bookings:payment})

        
    }
    catch(err){
        
        return res.status(403).json({message:"Something went wrong",error:err})
    
    
    
    }
   
}






module.exports={
    purchase,
    updatetransactionstatus,
    updatetransactionstatusfailed
}