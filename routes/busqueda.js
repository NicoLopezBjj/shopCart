const express = require('express')
const router=express.Router()
const busqueda=require('../controllers/busqueda')
const autenticar=require('../middlewares/authMiddleware')

router.get('/buscar',busqueda.buscar)

module.exports = router