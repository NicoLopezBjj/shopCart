const passport=require('passport')
const Producto=require('../models/Products')

const shop_get = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // Si el usuario está autenticado, obten los productos y renderiza la página de la tienda
      const products = await Producto.find();
      res.render('shop', { user: req.user, products });
      console.log(products)
    } else {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      res.redirect('/signin');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
}


module.exports={
    shop_get
}