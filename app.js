const express=require('express')
const authRouter=require('./routes/authRoutes')
const path=require ('path')

const app=express()

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

app.get('/',(req,res)=>[
    res.render('home')])
    
    app.use(authRouter)

app.listen(3900,()=>{
    console.log('servidor ejectuandose')
})