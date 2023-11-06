const express = require('express')
const router=express.Router()
const busqueda=require('../controllers/busqueda')

router.get('/buscar',busqueda.buscar)

module.exports = router