const passport = require('passport')
const Producto= require ('../models/Products')
const User = require('../models/User')

const buscar = async (req,res) =>{
    const busqueda = req.query.busqueda; // para obtener texto que el usuario escribió en el formulario
    try {
      const productosEncontrados = await Producto.find({ nombre: { $regex: new RegExp(busqueda, 'i') } });//busca por nombre en la DB
      
      if (productosEncontrados.length > 0) { //si el resultado es mayor a 0, osea encontro un producto, renderiza resultado
        res.render('resultado', { productos: productosEncontrados ,Producto,user : req.user});
    } else {
        // No se encontraron productos, renderiza una página de "no se encontraron resultados"
        res.render('no_resultados', { busqueda , user : req.user });
    }
    } catch (error) {
      console.log(error);
      res.render('error404')
    } 
}

module.exports={
    buscar
}