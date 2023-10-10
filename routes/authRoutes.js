const express = require('express')
const router=express.Router()
const User = require('../models/User')

router.get('/signin',(req,res)=>{
    res.render('signin')
})

router.post('/signin',(req,res)=>{
    console.log(req.body)
})

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.post('/signup',async (req,res)=>{
    const {email,password,nombre}= req.body
    try{
        const user= await User.create({email,password,nombre})
        res.status(201).json(user)
        console.log(user)
        res.redirect('home')
    }catch(err){
        console.log(err)
        res.status(400)
    }
})

module.exports=router