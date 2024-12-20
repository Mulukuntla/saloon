const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
  

const user = require('./routes/user');
const saloonUser = require('./routes/saloonUser');
const saloonService = require('./routes/saloonService');



const sequelize=require('./util/database')
const saloonUsers=require("./models/saloonUser")
const Service=require("./models/service")
const saloonStaff = require("./models/saloonStaff")
const saloonStaffServices = require("./models/staffServices")
const saloonbooking= require("./routes/saloonbooking")
const purchase= require("./routes/purchase")
const reviews= require("./routes/reviews")
const admin= require("./routes/admin")
const cron = require("node-cron");
const archieveMessages = require("./cron/cron");







var cors=require("cors")
const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));




app.use(cors());



app.set('view engine', 'ejs');
app.set('views', 'views');
app.use("/user",user)
app.use("/saloon",saloonUser)
app.use("/services",saloonService)
app.use("/booking",saloonbooking)
app.use("/pay",purchase)
app.use("/reviews",reviews)

app.use("/admin",admin)


 // Add a userId field in the Salon table
saloonUsers.hasMany(Service, { foreignKey: 'saloonId'});
Service.belongsTo(saloonUsers, { foreignKey: 'saloonId'});
saloonUsers.hasMany(saloonStaff, { foreignKey: 'saloonId' });
saloonStaff.belongsTo(saloonUsers, { foreignKey: 'saloonId' });


saloonStaff.belongsToMany(Service, { through: saloonStaffServices });
Service.belongsToMany(saloonStaff, { through: saloonStaffServices});













app.get('/search', (req, res) => {
  const query = req.query.query;
  const page = req.query.page;
  console.log(query)
  console.log(page)
  // Process the search logic here
  res.send(`Search query: ${query}, Page: ${page}`);
});



//cron.schedule("* * * * *", async () => {
//  console.log("Starting cron job to archive old messages...");
// await archieveMessages.archieveMessages();}, {
//  scheduled: true,
  
//});



sequelize
.sync()
.then(result =>{
  console.log(result)
  const PORT = process.env.PORT || 4008; // Change to a different port
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
})
.catch(err =>{
  console.log(err)
})


