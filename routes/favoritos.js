const express = require('express')
const router=express.Router()

const favoritos = require ('../controllers/favoritos')
const autenticar = require ('../middlewares/authMiddleware')

router.get('/favoritos',autenticar,favoritos.obtenerFavoritos)
router.post('/favoritos/agregar',autenticar,favoritos.agregarAFavoritos)

module.exports = router