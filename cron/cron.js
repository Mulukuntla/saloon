const booking= require("../models/saloonbooking")
const saloonStaff= require("../models/saloonStaff")
const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

const user = require('../models/user');
const saloon = require('../models/saloonUser');
const Sib=require("sib-api-v3-sdk")

const { Op } = require("sequelize"); 

const archieveMessages=async ()=>{
    try{
        console.log("Hi")
        const now = new Date();
        const local=now.toString()
        const oneHourFromNow = new Date(now.getTime()+23 * 60 * 60 * 1000);
        console.log(now)
        console.log(local)
        console.log(oneHourFromNow)
       
        const upcomingappointments = await booking.findAll({
            where: {
              datetime: {
                [Op.between]: [local, oneHourFromNow],
              },
            }
        });
        
        console.log(upcomingappointments)
        upcomingappointments.forEach(async (bookings)=> {
            const users=await user.findOne({where:{id:bookings.userId}})
            const userName=users.userName
            const saloons=await saloon.findOne({where:{id:bookings.saloonId}})
            const saloonName=saloons.saloonName
            const saloonStaffs=await saloonStaff.findOne({where:{id:bookings.staffId}})
            const saloonemployee=saloonStaffs.Name
            const date=bookings.datetime
            
            const service=bookings.service
            const emails=users.email
            console.log(userName,saloonName,saloonemployee,date,service)
            const client = Sib.ApiClient.instance;
            const apiKey = client.authentications["api-key"];
            apiKey.apiKey = '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';  // Assuming you have the Sendinblue API key in environment variable

            const tranEmailApi = new Sib.TransactionalEmailsApi();
            
            const id = uuid.v4();
                
            const sender = {
                    email: "yours.saisaketh@gmail.com",  // Replace with a verified sender email
                };
            const receivers = [{
                    email:emails,  // Get the user's email from the request body
                }];
                
                
                    // Send the transactional email using Sendinblue API
            const response = await tranEmailApi.sendTransacEmail({
                sender,
                to: receivers,
                subject: "conformation mail on booking a slot",
                textContent: `Hi ${userName},you have booked a slot on ${date} and the staff is ${saloonemployee} and the saloon is ${saloonName} and the service is ${service}`,
            });
            
            console.log(response);  // Log the response from Sendinblue

                
            });
}

    catch(err){
        console.log(err)

    }

            
        
  

}

module.exports={
    archieveMessages,
}