const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require("../util/database"); // Replace with your database connection details

// Service model
const Service = sequelize.define('staffServices', {
  id:{
    
    type: DataTypes.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  

  },
 saloonId:{
    type: DataTypes.INTEGER,

 }
});

// Sync the model with the database
module.exports = Service;