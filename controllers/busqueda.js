const passport = require('passport')
const Producto= require ('../models/Products')

const buscar = async (req,res) =>{
    const busqueda = req.query.busqueda; // para obtener texto que el usuario escribió en el formulario
    try {
      const productosEncontrados = await Producto.find({ nombre: { $regex: new RegExp(busqueda, 'i') } });
      if (productosEncontrados.length > 0) {
        res.render('resultado', { productos: productosEncontrados ,Producto,user : req.user});
    } else {
        // No se encontraron productos, renderiza una página de "no se encontraron resultados"
        res.render('no_resultados', { busqueda });
    }
    } catch (error) {
      console.log(error);
      res.render('error404')
    } 
}

module.exports={
    buscar
}