const express = require('express')
const router=express.Router()
const products=require('../controllers/products')
const Producto = require('../models/Products');


router.get('/shop',products.shop_get)
router.get('/shop/categoria/:categoria?', products.mostrarCategoria)
router.get('/shop/marca/:marca?',products.mostrarProductosPorMarca)
router.get('/shop/color/:color?',products.mostrarProductosPorColor)
router.get('/shop/producto/:id',products.mostrarProductoPorID)
  
  



  
module.exports = router