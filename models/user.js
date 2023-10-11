const mongoose = require('mongoose');
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    validate: [isEmail,'por favor ingrese un email valido']
  },
  password: {
    type: String,
    required: true,
    minlength:[6,'la contraseña debe tener al menos 6 caracteres']
  },
  nombre:{
    type:String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
