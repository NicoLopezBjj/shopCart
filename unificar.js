require('dotenv').config()

const connectDB=require('./db/conexion')

const Producto =require('./models/Products')

const jsonZapatillas=require('./ARCHIVOS/zapatillas.json')
const jsonMuebles=require('./ARCHIVOS/muebles.json')

const iniciar=async()=>{
    try{
            await connectDB(process.env.db_URL)
            await Producto.create(jsonZapatillas)
            await Producto.create(jsonMuebles)
            console.log('SE EFECTO EL CAMBIO')
    }
    catch(error){
        console.log(error)
    }
}

iniciar()