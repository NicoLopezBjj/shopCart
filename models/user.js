const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt=require('bcrypt')

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
  },
  cart:{
    items:[{
      productId:{
        type:mongoose.Types.ObjectId,
        ref:"Producto",
        required:true
      },
      cantidad:{
        type:Number,
        required:true
      }
    }],
    precioTotal:Number
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
  } catch (err) {
      throw new Error(err);
  }
};
const User = mongoose.model('User', userSchema);

module.exports = User;
