const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId, //Toma el id del usuario
    ref: 'User', // Referencia al modelo User
    required: true
  },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId, // Toma el id del producto
        ref: 'Producto', // Referencia al modelo Producto
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      },
      precioUnitario: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true
  }
});

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;