const express = require('express')
const router=express.Router()
const products=require('../controllers/products')



router.get('/shop',products.shop_get)
router.get('/shop/:categoria?', products.mostrarCategoria)


module.exports = router