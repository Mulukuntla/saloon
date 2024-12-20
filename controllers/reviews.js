const review= require("../models/reviews")
const booking= require("../models/saloonbooking")
const addreview= async (req,res,next) =>{
    console.log("Hi")
    try{
        const bookingId=req.body.bookingId
        const reviews=req.body.review
        const bookings=await booking.findOne({where:{id:bookingId}})
        console.log(bookings)
        const reviewss=await review.create({bookingId:bookingId,user:reviews,userId:req.user.id,saloonId:bookings.saloonId,staffId:bookings.staffId,service:bookings.service,date:bookings.datetime})
        res.status(201).json({reviews:reviewss})
        
      
      
    }  
    catch(err){
      console.log(err)
  }
}
const getreview= async (req,res,next) =>{
    console.log("Hi")
    try{
        
        const reviews=await review.findAll({where:{userId:req.user.id}})
        console.log(reviews)
        res.status(201).json({reviews:reviews})
        
      
      
    }  
    catch(err){
      console.log(err)
  }
}
const sendreview= async (req,res,next) =>{
    console.log("Hi")
    try{
        console.log("Hii")
        const reviewss=await review.findOne({where:{id:req.body.reviewId}})
        const update=await reviewss.update({saloon:req.body.review})
        res.status(201).json({reviews:update})
        
        
      
      
    }  
    catch(err){
      console.log(err)
  }
}

  module.exports={
    addreview,
    getreview,
    sendreview,
  }
