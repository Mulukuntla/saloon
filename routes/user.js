const express=require('express')
const router=express.Router()
const fs=require('fs')

router.get("/",(req,res,next)=>{

    fs.readFile('username.txt',(err,data)=>{
        if(err){
            console.log(err)
            data="No chat exists"
        }
        res.send(`
            ${data}
            <form action="/" method="POST" onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
                <input type="text" name="message">
                <input type="hidden" name="username" id="username"><br>
    
                <button type="submit">Send</button>
            </form>
            <script>
            
            <script>
        `);
    })
    

    
    
       
})
router.post("/",(req,res)=>{
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("username.txt",`${req.body.username}:${req.body.message} `,{flag:'a'},(err)=>{
        console.log(err)
        res.redirect("/")

    })
})

module.exports=router;