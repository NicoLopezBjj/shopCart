const express = require('express')
const router=express.Router()
const User = require('../models/User')
const authControllers=require('../controllers/authControllers')
const products=require('../controllers/products')

router.get('/shop',products.shop_get)