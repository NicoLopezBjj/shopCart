const express = require('express')
const router=express.Router()

const carrito = require ('../controllers/carrito')
const autenticar = require ('../middlewares/authMiddleware')

router.get('/carrito', autenticar,carrito.get_carrito)
router.post('/carrito/agregar', autenticar,carrito.agregarAlCarrito)
router.delete('/carrito/eliminar',autenticar ,carrito.eliminarCarrito)
router.post('/carrito/cambiarCantidad/:productId/:accion',autenticar, carrito.cambiarCantidad)
router.get('/carrito/cantidad',autenticar, carrito.actualizarContadorCarrito)
router.delete('/carrito/eliminarTodos', autenticar, carrito.eliminarTodo)



module.exports = router