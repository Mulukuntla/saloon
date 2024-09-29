const express=require('express')
const router=express.Router()

router.get("/login",(req,res,next)=>{
    res.send(`
        <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="GET">

	    <input id="username" type="text" name"title">

	    <button type="submit">add</button>

        </form>
    `);
    
    res.redirect('/')
       
})


module.exports=router;