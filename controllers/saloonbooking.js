const booking= require("../models/saloonbooking")
const saloonStaff= require("../models/saloonStaff")
const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

const user = require('../models/user');
const saloon = require('../models/saloonUser');
const Sib=require("sib-api-v3-sdk")
const addbooking= async (req,res,next) =>{
    console.log("Hi")
    try{
      console.log("Hii")
      const times=req.body.time
      const staff=req.body.staff
      const date=req.body.date
      const service=req.body.service
      console.log(times,staff,date,service)
      const saloon=await saloonStaff.findOne({where:{id:staff}})
      console.log(date)
      console.log(times)
      const time = times.split('-')[0].trim();
      console.log(time)
      const combineddate = new Date(`${date}T${time}:00`);
      const localdate = new Date(combineddate.getTime() - combineddate.getTimezoneOffset() * 60000);
      console.log(localdate)
      

      
      const bookings=await booking.create({userId:req.user.id,service:service,saloonId:saloon.saloonId,datetime:localdate,staffId:staff,serviceId:req.body.serviceId})
      res.status(201).json({bookings:bookings})      
      
      
    }  
    catch(err){
      console.log(err)
      res.status(500).json(err);}
  }



const bookingsms= async (req,res,next) =>{
  const bookingId=req.body.bookingId
  console.log(bookingId)
  const bookings=await booking.findOne({where:{id:bookingId}})
  console.log(bookings)
  const users=await user.findOne({where:{id:bookings.userId}})
  const userName=users.userName
  const saloons=await saloon.findOne({where:{id:bookings.saloonId}})
  const saloonName=saloons.saloonName
  const saloonStaffs=await saloonStaff.findOne({where:{id:bookings.staffId}})
  const saloonemployee=saloonStaffs.Name
  const date=bookings.date
  const time=bookings.time
  const service=bookings.service
  const emails=users.email
  console.log(userName,saloonName,saloonemployee,date,time,service)
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = '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'
;  // Assuming you have the Sendinblue API key in environment variable

  const tranEmailApi = new Sib.TransactionalEmailsApi();
   
  const id = uuid.v4();
      
  const sender = {
        email: "yours.saisaketh@gmail.com",  // Replace with a verified sender email
    };
  const receivers = [{
        email:emails,  // Get the user's email from the request body
    }];
    
    try {
        // Send the transactional email using Sendinblue API
        const response = await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "conformation mail on booking a slot",
            textContent: `Hi ${userName},you have booked a slot at ${time} on ${date} and the staff is ${saloonemployee} and the saloon is ${saloonName} and the service is ${service}`,
        });
        
        console.log(response);  // Log the response from Sendinblue

        // Respond back to the client indicating success
        res.status(200).json({ message: "Password reset link sent to your email." });

    } catch (err) {
        // Catch errors from the API call
        console.error(err);
        res.status(500).json({ message: "An error occurred while sending the email.", success: false });
    }
    
}



const getbooking= async (req,res,next) =>{
  console.log("Hi")
  try{
    const bookings=await booking.findAll({where:{userId:req.user.id}})
    
    res.status(201).json({bookings:bookings})      
    
    
  }  
  catch(err){
    console.log(err)
    res.status(500).json(err);}
}









const reshedule= async (req,res,next) =>{
  console.log("Hi")
  try{
    const bookingId=req.params.bookingId  
    console.log(bookingId)
    const bookings=await booking.destroy({where:{id:bookingId}}) 
    res.status(201).json({bookings:bookingId})  
    
    
  }  
  catch(err){
    console.log(err)
    res.status(500).json(err);}
}
module.exports={
    addbooking,
    bookingsms,
    getbooking,
    reshedule,
}