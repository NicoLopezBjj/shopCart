const express = require('express')
const router=express.Router()
const busqueda=require('../controllers/busqueda')

router.get('/busqueda',busqueda.buscar)

module.exports = router