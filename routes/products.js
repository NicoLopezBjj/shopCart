const express = require('express')
const router=express.Router()
const products=require('../controllers/products')
const Producto = require('../models/Products');


router.get('/shop',products.shop_get)
router.get('/shop/categoria/:categoria?', products.mostrarCategoria)
router.get('/shop/marca/:marca?',products.mostrarProductosPorMarca)
router.get('/shop/color/:color?',products.mostrarProductosPorColor)





router.get('/shop/producto/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const producto = await Producto.findById(productId);/* encuentra por id */
      
      if (producto) {
        res.render('producto', { product: producto });/* renderiza productos */
      } else {/* si no la pagina de error */
        res.render('error404');
      }
    } catch (error) {
      console.error(error);
      res.render('error404');
    }
  });
  
  



  
module.exports = router