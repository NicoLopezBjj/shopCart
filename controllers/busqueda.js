const passport = require('passport')
const Producto= require ('../models/Products')

const buscar = async (req,res) =>{
    const busqueda = req.query.busqueda; // para obtener texto que el usuario escribió en el formulario

    try {
      const productosEncontrados = await Producto.find({ nombre: { $regex: new RegExp(busqueda, 'i') } });
      res.render('resultados', { productos: productosEncontrados });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
}

module.exports={
    buscar
}