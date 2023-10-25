const Producto = require ('../models/Products')

const mostrarProductosMenorPrecio = async (req, res) => {
    try {
      const products = await Producto.find({ precio: { $lte: 999 } });
      res.render('shop', { user: req.user, products });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los productos filtrados');
    }
  };

const mostrarProductosMedioPrecio = async (req, res) => {
    try {
      const products = await Producto.find({ precio: { $gte: 1000, $lte: 25000 } });
      res.render('shop', { user: req.user, products });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los productos');
    }
  };

const mostrarProductosMayorPrecio = async (req, res) => {
    try {
      const products = await Producto.find({ precio: { $gte: 25000 } });
      res.render('shop', { user: req.user, products });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los productos');
    }
  };

module.exports = {
    mostrarProductosMayorPrecio,
    mostrarProductosMedioPrecio,
    mostrarProductosMenorPrecio
}