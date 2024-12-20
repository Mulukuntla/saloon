

const express = require('express');
const userauthenticate=require("../middleware/auth")


const router = express.Router();
const userController=require("../controllers/purchase")

router.get("/purchase/:bookingId",userauthenticate.authenticate,userController.purchase)

router.post("/updatetransactionstatus/:bookingId",userauthenticate.authenticate,userController.updatetransactionstatus);

router.post("/updatetransactionstatusfailed/:bookingId",userauthenticate.authenticate,userController.updatetransactionstatusfailed);


module.exports = router;