const Producto = require ('../models/Products')

const mostrarProductosMenorPrecio = async (req, res) => {
    try {
      const products = await Producto.find({ precio: { $lte: 999 } }).sort({ precio: 1 });
      res.render('precios', { user: req.user, products });
    } catch (error) {
      console.error(error);
      res.render('error404');
    }
  };

const mostrarProductosMedioPrecio = async (req, res) => {
    try {
      const products = await Producto.find({ precio: { $gte: 1000, $lte: 25000 } }).sort({ precio: 1 });
      res.render('precios', { user: req.user, products });
    } catch (error) {
      console.error(error);
      res.render('error404');
    }
  };

const mostrarProductosMayorPrecio = async (req, res) => {
    try {
      const products = await Producto.find({ precio: { $gte: 25000 } }).sort({ precio: 1 });
      res.render('precios', { user: req.user, products });
    } catch (error) {
      console.error(error);
      res.render('error404');
    }
  };

  const ordenarPorMenorPrecio = async (req, res) => {
    try {
      const products = await Producto.find().sort({ precio: 1 }); 
      res.render('precios', { user: req.user, products });
    } catch (error) {
      console.error(error);
      res.render('error404');
    }
  };
  
  const ordenarPorMayorPrecio = async (req, res) => {
    try {
      const products = await Producto.find().sort({ precio: -1 });
      res.render('precios', { user: req.user, products });
    } catch (error) {
      console.error(error);
      res.render('error404');
    }
  };
    
  
  
module.exports = {
    mostrarProductosMayorPrecio,
    mostrarProductosMedioPrecio,
    mostrarProductosMenorPrecio,
    ordenarPorMayorPrecio,
    ordenarPorMenorPrecio
}