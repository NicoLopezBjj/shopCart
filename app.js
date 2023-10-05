const express=require('express')
const path=require('path')


const app=express()

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

app.listen(3900,()=>{
    console.log('servidor ejectuandose')
})