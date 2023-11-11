const User = require ('../models/User')
const bcrypt=require('bcrypt')
const passport = require ('passport')
require ('../config/passport')

const signup_post = async (req, res) => {
    const { email, password, nombre } = req.body;


      // Validar en el lado del servidor
    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }


    try {
        const hashedPassword = await bcrypt.hash(password, 10); // se encripta la contraseña
        const user = await User.create({ email, password: hashedPassword, nombre }) // crea el usuario
        res.redirect('/signin');

    } catch (err) {
        console.log(err);
         // Manejar errores específicos, como correo electrónico duplicado
         if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado', message: 'Este correo electronico ya esta registrado!' });
        }

    }
}

const signup_get = async (req,res) =>{
    res.render('signup')
}

const signin_get = async (req, res) => {
    res.render('signin', { messages: req.flash('error') || [] }); // Pasar mensajes de error a la vista
}



const signin_post = passport.authenticate('local', {
    successRedirect: '/', // Ruta a la que redirigir si la autenticación es exitosa
    failureRedirect: '/signin', // Ruta a la que redirigir si la autenticación falla
    failureFlash: true, // Habilita mensajes flash para mostrar errores
})

const logout_get = (req, res) => {
  req.logout((err) => {
    if (err) {
      // Maneja el error de cierre de sesión, si es necesario
      return next(err);
    }
    res.redirect('/'); // Redirige al usuario a la página de inicio o a donde desees después de cerrar sesión.
  });
}

const logout_post = (req, res) => {
    req.logout(); // Cierra la sesión del usuario
    res.redirect('/'); // Redirige al usuario a la página de inicio o a donde desees después de cerrar sesión.
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

 