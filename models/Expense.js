const Sequelize=require("sequelize");

const sequelize=require("../util/database");

const Expense=sequelize.define("user",{
  
  userName: Sequelize.STRING,
  email:{
    type:Sequelize.STRING,
    primaryKey:true
    
  },
  password:{
    type:Sequelize.STRING,
   
  }
});

module.exports = Expense;
