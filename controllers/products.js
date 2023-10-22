const passport=require('passport')
const Producto=require('../models/Products')

// const show_category = async (req, res) => {
//   try {
//     const category = req.params.categoria;
//     console.log(req.params.categoria) // Obtener la categoria desde la URL
//     console.log(category)

//     // Si category tiene valor, busca los productos de esa categoría, de lo contrario, obtén todos los productos
//     const products = category ? await Producto.find({ categoria: category }) : await Producto.find();

//     // Renderiza la página de la tienda con los productos
//     res.render('shop', { user: req.user, products });

//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error al obtener los productos');
//   }
// };

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

const shop_muebles = async (req,res) =>{
    try {
        const products = await Producto.find({ categoria: 'Muebles' }); 
        res.render('muebles', { user: req.user, products });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
      }
    }

const shop_zapatillas = async (req,res) =>{
    try {
        const products = await Producto.find({ categoria: 'Zapatillas' }); 
        res.render('zapatillas', { user: req.user, products });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
      }
    }

const shop_ropa = async (req,res) =>{
    try {
        const products = await Producto.find({ categoria: 'Ropa' }); 
        res.render('ropa', { user: req.user, products });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
      }
    }

const shop_libros = async (req,res) =>{
    try {
        const products = await Producto.find({ categoria: 'Libros' }); 
        res.render('libros', { user: req.user, products });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
      }
    }

const shop_tecnologia = async (req,res) =>{
    try {
        const products = await Producto.find({ categoria: 'Tecnologia' }); 
        res.render('tecnologia', { user: req.user, products });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
      }
    }

const shop_bolsos = async (req,res) =>{
    try {
        const products = await Producto.find({ categoria: 'Bolsos' }); 
        res.render('bolsos', { user: req.user, products });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
      }
    }

module.exports={
    shop_get,
    shop_bolsos,
    shop_tecnologia,
    shop_libros,
    shop_ropa,
    shop_zapatillas,
    shop_muebles,
    // show_category
}