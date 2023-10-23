const passport=require('passport')
const Producto=require('../models/Products')


const shop_get = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // Si el usuario está autenticado, obten los productos y renderiza la página de la tienda
      const products = await Producto.find();
      res.render('shop', { user: req.user, products  });
    } else {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      res.redirect('/signin');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
}

const mostrarCategoria = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const { categoria } = req.params;
  
      const products = await Producto.find({ categoria });
      res.render('categoria', { user: req.user, products, categoria });
    } else {
      res.redirect('/signin');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
};

const mostrarProductosPorMarca = async (req, res) => {
  const { marca } = req.params;
  console.log(marca)
  
  const marcasEnBaseDeDatos = await Producto.distinct('marca');
  console.log(marcasEnBaseDeDatos);
  
  try {
    const products = await Producto.find({ marca :marca });
    console.log(marca)
    console.log(products)
    res.render('marca', { user: req.user, products,marca });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
};

module.exports={
    shop_get,
    mostrarCategoria,
    mostrarProductosPorMarca
}