const path=require('path')
const express= require('express');
const bodyparser=require('body-parser')
const app=express();
const adminRouter=require('./routes/admin')
const shopRouter=require('./routes/shop')
const contactRouter=require('./routes/contactUs')
const errorController=require('./controllers/error')
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use('/admin',adminRouter)
app.use(shopRouter)
app.use(contactRouter)

app.use(errorController.get404)



app.listen(4000);