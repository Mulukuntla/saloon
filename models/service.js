const { Sequelize, DataTypes } = require('sequelize');
const sequelize=require("../util/database"); // Replace with your database connection details

// Service model
const Service = sequelize.define('Service', {
  id:{
    
    type: DataTypes.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  

  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,  // Duration in minutes
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),  // Price format (e.g., 100.00)
    allowNull: false
  },
  availability:{
    type: DataTypes.STRING,

  }
});

// Sync the model with the database
module.exports = Service;