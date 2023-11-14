const passport=require('passport')
const Producto=require('../models/Products')
const User = require ('../models/User')

const shop_get = async (req, res) => {
  try {
    // Obtiene el número de la página desde los parámetros de la solicitud o establece el valor predeterminado en 1
    const pagina = parseInt(req.params.pagina) || 1;

    // Obtiene los productos de la página solicitada
    const products = await Producto.find({ pagina });

    res.render('shop', { user: req.user, products, pagina });
  } catch (error) {
    console.error(error);
    res.render('error404');
  }
}


const mostrarCategoria = async (req, res) => {
  try {
      const { categoria } = req.params
      const products = await Producto.find({ categoria });
      res.render('categoria', { user: req.user, products, categoria });
  } catch (error) {
    console.error(error);
    res.render('error404');
  }
};

const mostrarProductosPorMarca = async (req, res) => {
  try {
    const { marca } = req.params;
    const products = await Producto.find({ marca });
    res.render('marca', { user: req.user, products, marca });
  } catch (error) {
    console.error(error);
    res.render('error404');
  }
};

const mostrarProductosPorColor = async (req,res) =>{
   try {
    const { color } = req.params;
    const products = await Producto.find({ color });
    res.render('color', { user: req.user, products, color });
  } catch (error) {
    console.error(error);
    res.render('error404');
  }
};

const mostrarProductoPorID = async (req, res) => {
  const productId = req.params.id;
  try {
    const producto = await Producto.findById(productId);
    const usuario = await User.findById(req.user._id);

    if (producto) {
      // Paso 1: Obtener productos de la misma categoría y el mismo nombre
      const productosCategoria = await Producto.find({
        categoria: producto.categoria,
        nombre: producto.nombre,
      });

      // Paso 2: Renderizar la vista con las variables necesarias
      res.render('producto', { product: producto, user: req.user, usuario, productosCategoria });
    } else {
      res.render('error404');
    }
  } catch (error) {
    console.error(error);
    res.render('error404');
  }
};



const obtenerProductosMinishop = async (req, res) => {
  try {
      const minishopProducts = await Producto.find({ minishop: true }).exec();
      res.render('home', { user: req.user, products: minishopProducts });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los productos');
  }
};



const mostrarProducto = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Producto.findById(productId);

    // Paso 1: Obtener todos los productos de la misma categoría
    const productosCategoria = await Producto.find({ categoria: product.categoria });

    // Paso 2: Pasar los productos de la misma categoría al archivo EJS
    res.render('nombre_de_tu_vista', { product, productosCategoria });
  } catch (error) {
    console.error(error);
    res.render('error404');
  }
};



module.exports = {
  shop_get,
  mostrarCategoria,
  mostrarProductosPorMarca,
  mostrarProductosPorColor,
  mostrarProductoPorID,
  obtenerProductosMinishop,
  mostrarProducto 
};


