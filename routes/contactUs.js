const path=require('path')
const express=require('express')
const rootdir=require('../util/path')
const router=express.Router()

router.get("/contactUs",(req,res,next)=>{
    res.sendFile(path.join(rootdir,'views','contactUs.html'));
    
    
       
})
router.post("/success",(req,res,next)=>{
    
    res.send('<h1>Successfully Filled</h1>')
})
module.exports=router;