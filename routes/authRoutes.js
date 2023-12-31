const express = require('express')
const router=express.Router()
const authControllers=require('../controllers/authControllers')

router.get('/signin',authControllers.signin_get)

router.post('/signin',authControllers.signin_post)

router.get('/signup',authControllers.signup_get)

router.post('/signup',authControllers.signup_post)

router.get('/logout',authControllers.logout_get)

router.get('/home',authControllers.get_home)

router.post('/logout',authControllers.logout_post)

router.get('/miperfil',authControllers.miperfil)


router.get('/nosotros',authControllers.nosotros)


module.exports=router