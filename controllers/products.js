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
  try {
    if (!req.isAuthenticated()) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      return res.redirect('/signin');
    }

    const { marca } = req.params;
    const products = await Producto.find({ marca });
    res.render('marca', { user: req.user, products, marca });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
};

const mostrarProductosPorColor = async (req,res) =>{
  try {
    if (!req.isAuthenticated()) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      return res.redirect('/signin');
    }

    const { color } = req.params;
    console.log(color)
    const products = await Producto.find({ color });
    res.render('color', { user: req.user, products, color });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
};

const mostrarProductoPorID = async (req, res) => {
  const productId = req.params.id;
  try {
    if (!req.isAuthenticated()) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      return res.redirect('/signin');
    }
    const producto = await Producto.findById(productId);/* encuentra por id */
    
    if (producto) {
      res.render('producto', { product: producto, user : req.user });/* renderiza productos */
    } else {/* si no la pagina de error */
      res.render('error404');
    }
  } catch (error) {
    console.error(error);
    res.render('error404');
  }
}




module.exports={
    shop_get,
    mostrarCategoria,
    mostrarProductosPorMarca,
    mostrarProductosPorColor,
    mostrarProductoPorID
    
}