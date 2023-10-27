const express = require('express')
const router=express.Router()

const carrito = require ('../controllers/carrito')

router.get('/carrito', carrito.get_carrito)
router.post('/carrito/agregar',carrito.agregarAlCarrito)


module.exports = router