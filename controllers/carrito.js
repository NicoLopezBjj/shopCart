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
  const { productId} = req.body;
  

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
  console.log('controlador info :',productId,accion,cantidad)
  console.log('la accion del params :',accion)
  console.log('la cantidad del body :',cantidad)
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


module.exports = {
    get_carrito,
    agregarAlCarrito,
    eliminarCarrito,
    cambiarCantidad
}