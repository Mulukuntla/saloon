const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize=require('./util/database')

var cors=require("cors")
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/User');
const expenseRoutes = require('./routes/Expense');
const mUserRoutes = require('./routes/mUser');




app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use("/user",userRoutes)
app.use("/user",expenseRoutes)
app.use("/user",mUserRoutes)


app.use(errorController.get404);

sequelize
.sync()
.then(result =>{
  console.log(result)
  const PORT = process.env.PORT || 4001; // Change to a different port
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
})
.catch(err =>{
  console.log(err)
})


