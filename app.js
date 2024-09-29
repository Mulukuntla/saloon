
const express= require('express');
const bodyparser=require('body-parser')
const app=express();
const loginRouter=require('./routes/login')
const userRouter=require('./routes/user')
app.use(bodyparser.urlencoded({extended:false}))
app.use(loginRouter)
app.use(userRouter)

app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})



app.listen(4000);