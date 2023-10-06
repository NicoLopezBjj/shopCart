const express=require('express')
const authRouter=require('./routes/authRoutes')
const path=require ('path')
const mongoose=require('mongoose')
require('dotenv').config()

const app=express()

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

const db_URL = process.env.db_URL

const connectDataBase = async () => {
    try{
        const result = await mongoose.connect(db_URL)
        console.log ('Conexion exitosa a la base de datos')
    }
    catch(err){
        console.log('Error en la conexion a la base de datos', err)
    }
}

connectDataBase()



// ruta principal
app.get('/',(req,res)=>[
    res.render('home')])
    
    app.use(authRouter)

app.listen(3900,()=>{
    console.log('servidor ejectuandose')
})