const path=require('path')
const rootdir=require('../util/path')
const express= require('express');
const app=express();
exports.getAddProduct=(req,res,next)=>{
    res.sendFile(path.join(rootdir,'views','add-product.html'));
    
    
       
}
exports.postAddProduct=(req,res,next)=>{
    console.log(req.body)
    res.redirect('/')
}

exports.getProducts=(req,res,next)=>{
   
    res.sendFile(path.join(rootdir,'views','shop.html'))
}

exports.contactUsCon=(req,res,next)=>{
    res.sendFile(path.join(rootdir,'views','contactUs.html'));
    
    
       
}

exports.successcon=(req,res,next)=>{
    
    res.send('<h1>Successfully Filled</h1>')
}
