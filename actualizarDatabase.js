const mongoose = require('mongoose');
const Product = require('../shopCart/models/Products');

mongoose.connect('mongodb://localhost:27017/tu-basededatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function actualizarURLs() {
  try {
    const productos = await Product.find();

    for (const producto of productos) {
      // Actualiza la URL de la imagen aquí
      producto.imagen = producto.imagen.replace('https://github.com/NicoLopezBjj/images/blob/main/', 'https://raw.githubusercontent.com/NicoLopezBjj/images/main/');

      // Guarda el registro actualizado en la base de datos
      await producto.save();
    }

    console.log('Actualización completada.');
  } catch (error) {
    console.error('Error al actualizar las URLs:', error);
  }
}

actualizarURLs();
