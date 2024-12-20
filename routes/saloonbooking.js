

const express = require('express');


const router = express.Router();
const userController=require("../controllers/saloonbooking")

const userauthenticate=require("../middleware/auth")


router.post("/addbooking",userauthenticate.authenticate,userController.addbooking);

router.post("/bookingsms",userauthenticate.authenticate,userController.bookingsms);
router.get("/getbooking",userauthenticate.authenticate,userController.getbooking);


router.get("/reshedule/:bookingId",userauthenticate.authenticate,userController.reshedule);


module.exports = router;