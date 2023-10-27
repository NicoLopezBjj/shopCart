const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt=require('bcrypt')
const Producto = require ('../models/Products')

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

userSchema.methods.agregarAlCarrito = async function (productId, cantidad) {
  try {
    console.log(productId)
    const producto = await Producto.findById(productId);

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    const existeCartItem = this.cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existeCartItem) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      existeCartItem.cantidad += cantidad;
    } else {
      // Si el producto no está en el carrito, agrégalo
      this.cart.items.push({ productId, cantidad });
    }

    this.cart.precioTotal += producto.precio * cantidad;
    await this.save();

    return this;
  } catch (error) {
    throw new Error(error);
  }
};


const User = mongoose.model('User', userSchema);

module.exports = User;
