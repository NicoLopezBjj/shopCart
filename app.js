const express=require('express')
const authRouter=require('./routes/authRoutes')
const path=require ('path')
const mongoose=require('mongoose')
require('dotenv').config()

const app=express()

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')





// ruta principal
app.get('/',(req,res)=>[
    res.render('home')])
    
    app.use(authRouter)

app.listen(3900,()=>{
    console.log('servidor ejectuandose')
})