const express = require('express')
const router=express.Router()
const precios=require('../controllers/precios')

router.get('/shop/precio/menorPrecio', precios.mostrarProductosMenorPrecio);
router.get('/shop/precio/medioPrecio', precios.mostrarProductosMedioPrecio);
router.get('/shop/precio/mayorPrecio', precios.mostrarProductosMayorPrecio)
router.get('/shop/ordenar/mayor',precios.ordenarPorMayorPrecio)
router.get('/shop/ordenar/menor',precios.ordenarPorMenorPrecio)


module.exports= router