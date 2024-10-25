const Sequelize=require("sequelize");

const sequelize=require("../util/database");

const mTimes=sequelize.define("mTimes",{
  
  time:{
   type:Sequelize.STRING,
   primaryKey:true

  },
  link:Sequelize.STRING,
  vacancies:{
    type:Sequelize.INTEGER,
    
  }
 
});

module.exports = mTimes;
