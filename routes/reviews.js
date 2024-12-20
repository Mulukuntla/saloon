

const express = require('express');


const router = express.Router();
const userController=require("../controllers/reviews")

const userauthenticate=require("../middleware/auth")


router.post("/addreview",userauthenticate.authenticate,userController.addreview);
router.get("/getreview",userauthenticate.authenticate,userController.getreview);
router.post("/sendreview",userauthenticate.authenticate,userController.sendreview);




module.exports = router;