const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

const User = require('../models/Expense');
const Forgotpassword = require('../models/forgotPassword');
const Sib=require("sib-api-v3-sdk")


const forgotpassword = async (req, res) => {
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.SENGRID_API_KEY;  // Assuming you have the Sendinblue API key in environment variable

    const tranEmailApi = new Sib.TransactionalEmailsApi();
    const sender = {
        email: "yourssaisaketh50@gmail.com",  // Replace with a verified sender email
    };
    const receivers = [{
        email: "yours.saisaketh@gmail.com",  // Get the user's email from the request body
    }];
    
    try {
        // Send the transactional email using Sendinblue API
        const response = await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "Password Reset Request",
            textContent: "Click the link below to reset your password:\n" +
                         `http://localhost:3000/password/resetpassword/${uuid.v4()}`,
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

const resetpassword = (req, res) => {
    
}

const updatepassword = (req, res) => {

}


module.exports = {
    forgotpassword,
    updatepassword,
    resetpassword
}