const express = require('express')
const router=express.Router()
const products=require('../controllers/products')
const autenticar = require('../middlewares/authMiddleware')

router.get('/shop',products.shop_get)
router.get('/shop/categoria/:categoria?',products.mostrarCategoria)
router.get('/shop/marca/:marca?',products.mostrarProductosPorMarca)
router.get('/shop/color/:color?',products.mostrarProductosPorColor)
router.get('/shop/producto/:id',products.mostrarProductoPorID)
router.get('/shop/pagina/:pagina',products.shop_get);
  
  



  
module.exports = router