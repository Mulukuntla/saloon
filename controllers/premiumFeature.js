
const User= require("../models/Expense")
const ExpenseTracker= require("../models/ExpenseTracker")
const jwt=require("jsonwebtoken")
const sequelize=require("../util/database");


const getUserLeaderBoard=async (req,res,next)=>{
    try{
        const userLeaderBoardDetails=await User.findAll({
            attributes:["id","Username",[sequelize.fn("sum",sequelize.col("ExpenseTrackers.expense")),"total_cost"]],
            include:[
                {
                model:ExpenseTracker,
                attributes:[]
                }
            ],
            group:["User.id"],
            order:[["total_cost","DESC"]]


        })
        console.log(userLeaderBoardDetails[0])
        res.status(200).json({userLeaderBoardDetails})

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)

    }
}

module.exports={
    getUserLeaderBoard
}