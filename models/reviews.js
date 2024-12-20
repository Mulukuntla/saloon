const Sequelize=require("sequelize");

const sequelize=require("../util/database");

const user=sequelize.define("reviews",{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  bookingId:{
    type: Sequelize.STRING,
  },
  user:{
    type: Sequelize.STRING,
  },
  saloon:{
    type: Sequelize.STRING,
  },
  userId:{
    type: Sequelize.STRING,

  },
  saloonId:{
    type: Sequelize.STRING,

  },
  staffId:{
    type: Sequelize.STRING,

  },
  service:{
    type: Sequelize.STRING,

  },
  date:{
    type: Sequelize.DATE,


  }

})
 


module.exports = user;
