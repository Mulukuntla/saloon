

const express = require('express');
const userauthenticate=require("../middleware/auth")


const router = express.Router();
const userController=require("../controllers/admin")

router.get("/allappointments",userController.allappointments)



module.exports = router;