

const express = require('express');


const router = express.Router();
const userController=require("../controllers/saloonUser")
const userauthenticate=require("../middleware/auth")


router.post("/signup",userController.signup);
router.post("/signin",userController.signin);
router.get("/allsaloons",userauthenticate.authenticate,userController.allsaloons);
router.get("/allsaloons/:saloonId",userauthenticate.authenticate,userController.getSaloon);


module.exports = router;