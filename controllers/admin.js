const booking= require("../models/saloonbooking")
const allappointments= async (req,res,next) =>{
    console.log("Hi")
    try{
        
        const bookings=await booking.findAll()
        
        res.status(201).json({bookings:bookings})
        
      
      
    }  
    catch(err){
      console.log(err)
  }
}


module.exports={
    allappointments,
}