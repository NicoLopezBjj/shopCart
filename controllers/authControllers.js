const User= require('../models/User')

const signup_post = async (req, res) => {
    const { email, password, nombre } = req.body;
    try {
        const user = await User.create({ email, password, nombre });
        res.status(201).json(user);
        console.log(user);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
}

const signup_get = async (req,res) =>{
    res.render('signup')
}

const signin_get = async (req,res) =>{
    
}

const signin_post = async (req,res) =>{
    
}

module.exports = { 
    signup_post, 
    signup_get,
    signin_get,
    signin_post };