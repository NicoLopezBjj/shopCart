const express = require('express')
const router=express.Router()
const products=require('../controllers/products')



router.get('/shop',products.shop_get)
router.get('/shop/categoria/:categoria?', products.mostrarCategoria)
router.get('/shop/marca/:marca?',products.mostrarProductosPorMarca)
router.get('/shop/color/:color?',products.mostrarProductosPorColor)


module.exports = router