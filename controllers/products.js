const passport=require('passport')
const Producto=require('../models/Products')


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