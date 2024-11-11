

const User= require("../models/Expense")
const Expense= require("../models/ExpenseTracker")
const jwt=require("jsonwebtoken")

const getUserLeaderBoard=async (req,res,next)=>{
    try{
        const users=await User.findAll()
        const expenses=await Expense.findAll()
        const userAggregatedExpenses=[]
        expenses.forEach(expense => {
            if(userAggregatedExpenses[expense.userId]){
                userAggregatedExpenses[expense.userId]=userAggregatedExpenses[expense.userId]+expense.expense
            }
            else{
                userAggregatedExpenses[expense.userId]=expense.expense
            }
            
        })
        var userLeaderBoardDetails=[];
        users.forEach((user)=>{
            userLeaderBoardDetails.push({name:user.userName,total_cost:userAggregatedExpenses[user.id]} || 0)

        })
        userLeaderBoardDetails.sort((a,b)=>b.total_cost-a.total_cost)

        res.status(200).json({userLeaderBoardDetails})

    }
    catch(err){
        res.status(500).json(err)

    }
}

module.exports={
    getUserLeaderBoard
}