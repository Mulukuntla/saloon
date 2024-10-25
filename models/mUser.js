const Sequelize=require("sequelize");

const sequelize=require("../util/database");

const mUsers=sequelize.define("mUsers",{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  user: Sequelize.STRING,
  mentor:{
    type:Sequelize.STRING,
    
  },
  link:Sequelize.STRING,
  time:Sequelize.STRING
});

module.exports = mUsers;
