const express = require('express')
const router=express.Router()

const carrito = require ('../controllers/carrito')

router.get('/carrito', carrito.get_carrito)


module.exports = router