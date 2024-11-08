const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
  
const errorController = require('./controllers/error');
const expenseTrackerRoutes = require('./routes/ExpenseTracker');


const sequelize=require('./util/database')


var cors=require("cors")
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));




app.use(cors());




const expenseRoutes = require('./routes/Expense');


app.set('view engine', 'ejs');
app.set('views', 'views');




app.use("/user",expenseRoutes)
app.use("/expense",expenseTrackerRoutes)


app.get('/search', (req, res) => {
  const query = req.query.query;
  const page = req.query.page;
  console.log(query)
  console.log(page)
  // Process the search logic here
  res.send(`Search query: ${query}, Page: ${page}`);
});


app.use(errorController.get404);

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


