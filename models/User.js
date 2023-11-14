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
    precioTotal:{
      type:Number}
  }
});

// Metodos que modifican el esquema

userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
  } catch (err) {
      throw new Error(err);
  }
};


userSchema.methods.agregarAlCarrito = async function (productId, cantidad = 1, accion) {
  console.log('productid method:',productId)
  console.log('cantidad method:',cantidad)
  console.log('accion method:',accion)
  try {
    const producto = await Producto.findById(productId);

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    const existeCartItem = this.cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existeCartItem) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      if (accion === 'restar') {
        existeCartItem.cantidad -= cantidad;
      } else {
        // Si la acción no es 'restar', se asume 'sumar' o cualquier otra cosa
        existeCartItem.cantidad += cantidad;
      }
    } else {
      // Si el producto no está en el carrito, agrégalo
      this.cart.items.push({ productId, cantidad : 1});
    }

    if (typeof this.cart.precioTotal !== 'number') {
      this.cart.precioTotal = 0;
    }

    // Actualiza el precio total basado en la acción
    if (accion === 'restar') {
      this.cart.precioTotal -= producto.precio * cantidad;
    } else {
      // Si la acción no es 'restar', se asume 'sumar' o cualquier otra cosa
      this.cart.precioTotal += producto.precio * cantidad;
    }

    await this.save();

    return {
      cantidad: existeCartItem ? existeCartItem.cantidad : cantidad,
      precioTotal: this.cart.precioTotal
    };

   
  } catch (error) {
    throw new Error(error);
  }
};




userSchema.methods.eliminarCarrito = async function(productId) {
  const itemEnCarrito = this.cart.items.find(item => item.productId.toString() === productId);

  if (!itemEnCarrito) {
    throw new Error('El producto no se encuentra en el carrito');
  }

  this.cart.items = this.cart.items.filter(item => item.productId.toString() !== productId);


   // Restar el precio del producto eliminado al precioTotal
   const producto = await Producto.findById(productId);
   this.cart.precioTotal -= producto.precio * itemEnCarrito.cantidad;

  
  if (this.cart.items.length === 0) {
    this.cart.precioTotal = null
  }

  
  await this.save();

  return itemEnCarrito;

}

const User = mongoose.model('User', userSchema);

module.exports = User;
