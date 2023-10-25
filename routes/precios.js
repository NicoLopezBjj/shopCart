const express = require('express')
const router=express.Router()
const precios=require('../controllers/precios')

router.get('/shop/precio/menorPrecio', precios.mostrarProductosMenorPrecio);
router.get('/shop/precio/medioPrecio', precios.mostrarProductosMedioPrecio);
router.get('/shop/precio/mayorPrecio', precios.mostrarProductosMayorPrecio)


module.exports= router