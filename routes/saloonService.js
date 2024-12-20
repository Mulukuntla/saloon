
const express = require('express');
const userauthenticate=require("../middleware/saloonAuth")

const router = express.Router();
const userController=require("../controllers/saloonService")

router.post("/addService",userauthenticate.authenticate,userController.addSaloonService)
router.post("/addStaff",userauthenticate.authenticate,userController.addStaff)
router.get("/addStaffToService",userauthenticate.authenticate,userController.addStaffToService)
router.post("/addStaffToServicess",userauthenticate.authenticate,userController.addStaffToServicess)
router.get("/:serviceId",userauthenticate.authenticate,userController.getStaff)




module.exports = router;