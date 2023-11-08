const express = require('express')
const router=express.Router()
const products=require('../controllers/products')
const autenticar = require('../middlewares/authMiddleware')

router.get('/shop',autenticar,products.shop_get)
router.get('/shop/categoria/:categoria?',autenticar, products.mostrarCategoria)
router.get('/shop/marca/:marca?',autenticar,products.mostrarProductosPorMarca)
router.get('/shop/color/:color?',autenticar,products.mostrarProductosPorColor)
router.get('/shop/producto/:id',autenticar,products.mostrarProductoPorID)
  
  



  
module.exports = router