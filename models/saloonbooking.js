const Sequelize=require("sequelize");

const sequelize=require("../util/database");

const saloonUser=sequelize.define("booking",{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  userId: Sequelize.INTEGER,
  service:Sequelize.STRING,
  saloonId:Sequelize.STRING,
  datetime:Sequelize.DATE,
  staffId:Sequelize.STRING,
  serviceId:Sequelize.INTEGER,
  status:Sequelize.STRING,

  
   
 
  
})
 


module.exports = saloonUser;
