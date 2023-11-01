const User = require ('../models/User')
const bcrypt=require('bcrypt')
const passport = require ('passport')
require ('../config/passport')

const signup_post = async (req, res) => {
    const { email, password, nombre } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // se encripta la contraseña
        const user = await User.create({ email, password: hashedPassword, nombre }) // crea el usuario
        await user.save();
        res.redirect('/signin');

    } catch (err) {
        console.log(err);
        res.status(400);
    }
}

const signup_get = async (req,res) =>{
    res.render('signup')
}

const signin_get = async (req,res) =>{
    res.render('signin')
}


const signin_post = passport.authenticate('local', {
    successRedirect: '/', // Ruta a la que redirigir si la autenticación es exitosa
    failureRedirect: '/signin', // Ruta a la que redirigir si la autenticación falla
    failureFlash: true, // Habilita mensajes flash para mostrar errores
})

const logout_get = async (req,res) =>{
    res.render('home')
}

const logout_post = async (req,res,next) =>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      })
}

const get_home = async (req,res) =>{
    res.render('home',{user : req.user})
}

const miperfil = async (req,res)=>{
    res.render('perfil',{user: req.user})
}

  
module.exports = { 
    signup_post, 
    signup_get,
    signin_get,
    signin_post,
    logout_get,
    logout_post,
    get_home,
    miperfil
}

 