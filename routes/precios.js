const express = require('express')
const router=express.Router()
const precios=require('../controllers/precios')

router.get('/precios/precio/menorPrecio', precios.mostrarProductosMenorPrecio);
router.get('/precios/precio/medioPrecio', precios.mostrarProductosMedioPrecio);
router.get('/precios/precio/mayorPrecio', precios.mostrarProductosMayorPrecio)
router.get('/precios/ordenar/mayor',precios.ordenarPorMayorPrecio)
router.get('/precios/ordenar/menor',precios.ordenarPorMenorPrecio)


module.exports= router