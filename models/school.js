const Sequelize=require("sequelize");

const sequelize=require("../util/database");

const school=sequelize.define("school",{
  date:{
    type: Sequelize.STRING,
    allowNull:false,
    primaryKey:true
  },
  Siva:Sequelize.STRING,
  Rajesh:Sequelize.STRING,
  Ashok:Sequelize.STRING,
  Sai:Sequelize.STRING,
  Haritha:Sequelize.STRING,
  Ram:Sequelize.STRING,
  Krishna:Sequelize.STRING,
  Anu:Sequelize.STRING,
  Ammu:Sequelize.STRING,
  Adi:Sequelize.STRING,
  
});

module.exports = school;
