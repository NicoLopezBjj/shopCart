const passport = require('passport')
const Producto= require ('../models/Products')

const buscar = async (req,res) =>{
    const busqueda = req.query.busqueda; // para obtener texto que el usuario escribió en el formulario
    console.log(busqueda)
    try {
      const productosEncontrados = await Producto.find({ nombre: { $regex: new RegExp(busqueda, 'i') } });
      res.render('resultado', { productos: productosEncontrados ,Producto,user : req.user});
    } catch (error) {
      console.log(error);
      res.render('error404')
    }
}

module.exports={
    buscar
}