const express = require('express')
const router=express.Router()
const products=require('../controllers/products')


// router.get('/shop/:category?',products.show_category)
router.get('/shop',products.shop_get)
router.get('/shop/bolsos',products.shop_bolsos)
router.get('/shop/zapatillas',products.shop_zapatillas)
router.get('/shop/libros',products.shop_libros)
router.get('/shop/ropa',products.shop_ropa)
router.get('/shop/muebles',products.shop_muebles)
router.get('/shop/tecnologia',products.shop_tecnologia)

module.exports = router