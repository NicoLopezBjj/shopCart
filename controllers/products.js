const passport=require('passport')
const Producto=require('../models/Products')

const show_category = async (req, res) => {
  try {
    const category = req.params.category; // Obtener la categoria desde la URL

    // Si category tiene valor, busca los productos de esa categoría, de lo contrario, obtén todos los productos
    const products = category ? await Producto.find({ categoria: category }) : await Producto.find();

    // Renderiza la página de la tienda con los productos
    res.render('shop', { user: req.user, products });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
};

// const shop_get = async (req, res) => {
//   try {
//     if (req.isAuthenticated()) {
//       // Si el usuario está autenticado, obten los productos y renderiza la página de la tienda
//       const products = await Producto.find();
//       res.render('shop', { user: req.user, products });
//     } else {
//       // Si el usuario no está autenticado, redirige a la página de inicio de sesión
//       res.redirect('/signin');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error al obtener los productos');
//   }
// }

const shop_muebles = (req,res) =>{
    res.render('muebles')
}
const shop_zapatillas = (req,res) =>{
    res.render('zapatillas')
}
const shop_ropa = (req,res) =>{
    res.render('ropa')
}
const shop_libros = (req,res) =>{
    res.render('libros')
}
const shop_tecnologia = (req,res) =>{
    res.render('tecnologia')
}
const shop_bolsos = (req,res) =>{
    res.render('bolsos')
}
module.exports={
    // shop_get,
    shop_bolsos,
    shop_tecnologia,
    shop_libros,
    shop_ropa,
    shop_zapatillas,
    shop_muebles,
    show_category
}