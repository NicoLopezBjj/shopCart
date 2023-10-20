const express = require('express')
const router=express.Router()
const authControllers=require('../controllers/authControllers')

router.get('/signin',authControllers.signin_get)

router.post('/signin',authControllers.signin_post)

router.get('/signup',authControllers.signup_get)

router.post('/signup',authControllers.signup_post)

router.get('/logout',authControllers.logout_get)


router.post('/logout',authControllers.logout_post)


module.exports=router