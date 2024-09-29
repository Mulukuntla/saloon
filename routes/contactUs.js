const path=require('path')
const express=require('express')
const rootdir=require('../util/path')
const productsController=require('../controllers/products')
const router=express.Router()

router.get("/contactUs",productsController.contactUsCon)
router.post("/success",productsController.successcon)
module.exports=router;