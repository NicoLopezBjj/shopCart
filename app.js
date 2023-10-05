const express=require('express')
const path=require('path')


const app=express()

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

app.get('/signin',(req,res)=>{
    res.render('signin')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.listen(3900,()=>{
    console.log('servidor ejectuandose')
})