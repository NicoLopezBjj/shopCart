const mongoose = require('mongoose');
const Producto = require('../shopCart/models/Products');
require('dotenv').config()

const db_URL=process.env.db_URL

mongoose.connect(db_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const actualizarMarcas = async () => {
  try {
    const productos = await Producto.find();

    for (const producto of productos) {
      if (producto.marca === 'Mollie stones') {
        producto.marca = 'MollieStones';
        await producto.save();
      }
     if (producto.marca === 'Grocery outlet'){
        producto.marca = 'GroceryOutlet'
        await producto.save()
      }
    if (producto.marca === 'Sports Basement'){
      producto.marca = 'SportsBasement'
      await producto.save()
    }
    if(producto.marca === 'Container Store'){
      producto.marca = 'ContainerStore'
      await producto.save()  
    }
    }

    console.log('Actualización completada');
  } catch (error) {
    console.error('Error al actualizar:', error);
  } finally {
    mongoose.connection.close();
  }
}

actualizarMarcas()
