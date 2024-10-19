

const express = require('express');


const router = express.Router();
const userController=require("../controllers/Expense")

router.post("/add-expense",userController.addExpense);
router.get("/get-expense",userController.getExpense)

router.delete("/delete-expense/:id",userController.deleteExpense)
router.delete("/edit-expense/:id",userController.preeditExpense)

module.exports = router;