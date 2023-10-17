require('dotenv').config()

const connectDB=require('./db/conexion')

const Producto =require('./models/Products')

const jsonBolsos = require ('./ARCHIVOS/bolsos.json')
const jsonLibros = require ('./ARCHIVOS/libros.json')
const jsonTecnologia = require ('./ARCHIVOS/tecnologia.json')
const jsonRopa = require ('./ARCHIVOS/ropa.json')

const iniciar=async()=>{
    try{
            await connectDB(process.env.db_URL)
            await Producto.create(jsonBolsos)
            await Producto.create(jsonLibros)
            await Producto.create(jsonTecnologia)
            await Producto.create(jsonRopa)
            console.log('SE EFECTO EL CAMBIO')
    }
    catch(error){
        console.log(error)
    }
}

iniciar()
