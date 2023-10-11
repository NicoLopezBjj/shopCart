const express = require('express')
const router=express.Router()
const User = require('../models/User')
const authControllers=require('../controllers/authControllers')

router.get('/signin',(req,res)=>{
    res.render('signin')
})

router.post('/signin',(req,res)=>{
    console.log(req.body)
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.post('/signup',authControllers.signup_post)


module.exports=router