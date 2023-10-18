const User= require('../models/User')
const bcrypt=require('bcrypt')

const signup_post = async (req, res) => {
    const { email, password, nombre } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, nombre })
        res.render('signin')
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

const signin_post = async (req,res) =>{
    const { email, password } = req.body
    try{
        const user = await User.findOne({ email })
       
        if (!user) {
            return res.status(401).json({ message: 'Email invalido' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Password invalido' });
        }else{
            req.session.user = user
            console.log(req.session.user.nombre)
            res.render('home', { user: req.session.user });
        }

    }catch(err){
        console.log(err)
        res.status(400).json({message:'Error del servidor'})
    }
}

module.exports = { 
    signup_post, 
    signup_get,
    signin_get,
    signin_post }