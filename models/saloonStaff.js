const Sequelize=require("sequelize");

const sequelize=require("../util/database");

const user=sequelize.define("saloonStaff",{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  Name: Sequelize.STRING,
  
  Specialization: {
    type:Sequelize.JSON
    
  },
  skills:{
    type:Sequelize.JSON

  },
  availability:{
    type: Sequelize.STRING,
  },
  services:{
    type: Sequelize.STRING,

  }
})
 


module.exports = user;
