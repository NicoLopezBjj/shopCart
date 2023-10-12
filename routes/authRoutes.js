const express = require('express')
const router=express.Router()
const User = require('../models/User')
const authControllers=require('../controllers/authControllers')

router.get('/signin',authControllers.signin_get)

router.post('/signin',authControllers.signin_post)

router.get('/signup',authControllers.signup_get)

router.post('/signup',authControllers.signup_post)


module.exports=router