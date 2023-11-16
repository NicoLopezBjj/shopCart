const User = require ('../models/User')
const Producto = require ('../models/Products')


const get_carrito = async (req,res) =>{
  try {
    const usuario = await User.findById(req.user._id);
    
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const productosEnCarrito = await Promise.all(usuario.cart.items.map(async (item) => {
      const producto = await Producto.findById(item.productId);
      return {
        cantidad: item.cantidad,
        producto,
      };
    }));

    const productosFiltrados = productosEnCarrito.filter((producto, index, self) =>
    index === self.findIndex((p) => (
      p.producto._id.toString() === producto.producto._id.toString()
    ))
  );

    const precioTotal = usuario.cart.precioTotal

    res.render('carrito', { user:req.user, productosEnCarrito, precioTotal });
  } catch (error) {
    console.error(error);
    res.render('error404');
  }
};

const agregarAlCarrito = async (req, res) => {
  const { productId,cantidad,accion} = req.body;
  

  try {
    const usuario = await User.findById(req.user._id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const existeCartItem = usuario.cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existeCartItem) {
      existeCartItem.cantidad += 1; 
    } else {
      await usuario.agregarAlCarrito(productId,cantidad,accion);
    }

    return res.redirect('/carrito');
  } catch (error) {
    console.error(error);
    res.render('error404');
  }
};

const eliminarCarrito = async (req,res) => { 
  const { productId } = req.body // requiero id del body

  try {
    const usuario = await User.findById(req.user._id); //busco ese id en DB y lo paso a usuario


    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const productoEliminado = await usuario.eliminarCarrito(productId); //busco en el cart de ese usuario el producto para eliminar, a traves de productId
    
    if (usuario.cart.items.length === 0) {
      // Si el carrito está vacío, redirige al usuario a la página de la tienda
      return res.redirect('/shop');
    }

    const productosEnCarrito = await Promise.all(
      usuario.cart.items.map(async (item) => {
        const producto = await Producto.findById(item.productId);
        return {
          cantidad: item.cantidad,
          producto,
        };
      })
    );  // vuelve a crear un array nuevo con los productos que quedaron.

    const precioTotal = usuario.cart.precioTotal //busco el precioTotal en el cart y lo pongo en una variable


    res.render('carrito',{user : req.user , productosEnCarrito, precioTotal}); //renderizo carrito con todas las variables, para poder mostrarla en la plantilla
  } catch (error) {
    console.log('El error es ',error);
    res.render('error404');
  }
}


const cambiarCantidad = async (req, res) => {
  const { productId, accion } = req.params;
  const { cantidad } = req.body; // toma  la cantidad desde el cliente
  
  try {
    // Obtiene el usuario actual
    const user = await User.findById(req.user._id);

    // Llama al método agregarAlCarrito para actualizar la cantidad
    await user.agregarAlCarrito(productId, cantidad, accion);

    // Devuelve la nueva información del carrito al cliente
    res.json({
      cantidad: user.cart.items.find(item => item.productId.toString() === productId).cantidad,
      precioTotal: user.cart.precioTotal
    });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const actualizarContadorCarrito = async (req, res) => {
    try {
      const usuario = await User.findById(req.user._id); // Busca al usuario por su ID
      
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      const cantidadProductos = usuario.cart.items.reduce((total, item) => total + item.cantidad, 0); // Suma la cantidad de productos en el carrito
  
      res.json({ cantidad: cantidadProductos }); // Devuelve la cantidad de productos al frontend
    } catch (error) {
      console.error('Error al obtener la cantidad de productos en el carrito:', error);
      res.render('error404')
    }
  };
  

  const eliminarTodo = async (req,res)=>{
    
  // Código para limpiar el carrito
  req.user.cart.items = [];
  req.user.cart.precioTotal = 0;

  // Guardar el usuario actualizado
  req.user.save()
    .then(() => {
      // Enviar una respuesta al cliente
      res.status(200).send('Se eliminaron todos los productos del carrito');
    })
    .catch(error => {
      // Manejar cualquier error que ocurra al guardar los cambios en el usuario
      console.error('Error al eliminar todos los productos del carrito:', error);
      res.status(500).send('Error interno del servidor al eliminar productos del carrito');
    });
}
  


module.exports = {
    get_carrito,
    agregarAlCarrito,
    eliminarCarrito,
    cambiarCantidad,
    actualizarContadorCarrito,
    eliminarTodo
}