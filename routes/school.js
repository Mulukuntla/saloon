const express = require('express');


const router = express.Router();
const userController=require("../controllers/school")

router.post("/add-attendance",userController.addSchool);

router.get("/get-attendance/:date",userController.getSchool)

router.get("/get-attendance",userController.getTotal)



module.exports = router;