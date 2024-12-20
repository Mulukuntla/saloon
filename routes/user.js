

const express = require('express');


const router = express.Router();
const userController=require("../controllers/user")
const userauthenticate=require("../middleware/auth")

router.post("/signup",userController.signup);
router.post("/signin",userController.signin);
router.post("/updatePreferences",userauthenticate.authenticate,userController.updatePreferences);

module.exports = router;