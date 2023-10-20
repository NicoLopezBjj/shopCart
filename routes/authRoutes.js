const express = require('express')
const router=express.Router()
const authControllers=require('../controllers/authControllers')

router.get('/signin',authControllers.signin_get)

router.post('/signin',authControllers.signin_post)

router.get('/signup',authControllers.signup_get)

router.post('/signup',authControllers.signup_post)

router.get('/logout',(req,res)=>{
    res.render('home')
})

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });


module.exports=router