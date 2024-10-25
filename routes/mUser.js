

const express = require('express');


const router = express.Router();
const userController=require("../controllers/mUser")

router.post("/add-mUser",userController.addmUsers);

router.get("/get-mUser",userController.getmUsers)

router.delete("/delete-mUser/:id",userController.deletemUsers)


module.exports = router;