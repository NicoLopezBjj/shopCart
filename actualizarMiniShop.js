const mongoose = require('mongoose');
const Producto = require('../shopCart/models/Products');
require('dotenv').config()

const DB_URL=process.env.DB_URL


async function actualizarMiniShop() {
    await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      const productos = await Producto.find();
  
      // Agregar la propiedad a todos los productos
      await Producto.updateMany({}, { $set: { minishop: false } });
  
      // Obtener categorías únicas
      const categorias = [...new Set(productos.map(producto => producto.categoria))];
  
      // Poner minishop en true para los primeros 8 productos de cada categoría
      for (const categoria of categorias) {
        const productosCategoria = productos.filter(producto => producto.categoria === categoria);
        const primeros8Productos = productosCategoria.slice(0, 8);
  
        for (const producto of primeros8Productos) {
          await Producto.updateOne({ _id: producto._id }, { $set: { minishop: true } });
        }
      }
  
      console.log('Base de datos actualizada');
    } finally {
      await mongoose.disconnect();
    }
  }
  
  actualizarMiniShop();