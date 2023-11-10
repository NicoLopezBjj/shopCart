const mongoose = require('mongoose');
const Producto = require('../shopCart/models/Products');
require('dotenv').config()

const DB_URL=process.env.DB_URL

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  
async function asignarPaginas() {
    try {
      const paginas = [1, 2, 3];
      let paginaActualIndex = 0;
  
      // Obtiene todos los productos de la base de datos
      const productos = await Producto.find();
  
      // Actualiza cada producto con la propiedad de la página
      const productosActualizados = productos.map(producto => {
        producto.pagina = paginas[paginaActualIndex];
        paginaActualIndex = (paginaActualIndex + 1) % paginas.length;
        return producto.save(); // Guarda el producto actualizado en la base de datos
      });
  
      // Espera a que se completen todas las operaciones de guardado
      await Promise.all(productosActualizados);
  
      console.log('Asignación de páginas completada.');
    } catch (error) {
      console.error('Error al asignar páginas:', error);
    } finally {
      mongoose.connection.close(); // Cierra la conexión a la base de datos al finalizar
    }
  }
  
  // Llama a la función para asignar páginas
  asignarPaginas();