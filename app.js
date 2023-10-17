const express=require('express')
const session=require('express-session')
const authRouter=require('./routes/authRoutes')
const path=require ('path')
const mongoose=require('mongoose')
require('dotenv').config()
const productsRouter=require('./routes/products')


const app=express()

app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const secretSession = process.env.secretSession
app.use(session({
    secret: secretSession,
    resave: false,
    saveUninitialized: true
}))

app.set('view engine','ejs')

// conexion a la base de datos
const db_URL = process.env.db_URL
const PUERTO = process.env.PUERTO
const connectDB=require('./db/conexion')

const connectDataBase = async () => {
    try{
        await connectDB(db_URL)
        console.log ('Conexion exitosa a la base de datos')
        app.listen(PUERTO,console.log('servidor ejecutandose'))
    }
    catch(err){
        console.log('Error en la conexion a la base de datos', err)
    }
}

connectDataBase()

// ruta principal
app.get('/',(req,res)=>{

    res.render('home')})
    
app.use(authRouter)


