const express = require('express')
const router=express.Router()
const products=require('../controllers/products')

router.get('/shop/:category?',products.show_category)

module.exports = router