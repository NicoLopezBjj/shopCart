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
    return res.status(500).json({ mensaje: 'Error al obtener productos del carrito' });
  }
};

const agregarAlCarrito = async (req, res) => {
  const { productId } = req.body;

  try {
    const usuario = await User.findById(req.user._id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const existeCartItem = usuario.cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existeCartItem) {
      existeCartItem.cantidad += 1; // Asumiendo que queremos agregar uno más
    } else {
      await usuario.agregarAlCarrito(productId, 1);
    }

    return res.redirect('/carrito');
  } catch (error) {
    console.error(error);
    res.render('error404');
  }
};

const eliminarCarrito = async (req,res) => { 
  const { productId } = req.body

  try {
    const usuario = await User.findById(req.user._id);


    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const productoEliminado = await usuario.eliminarCarrito(productId);
    
    
    const productosEnCarrito = await Promise.all(
      usuario.cart.items.map(async (item) => {
        const producto = await Producto.findById(item.productId);
        return {
          cantidad: item.cantidad,
          producto,
        };
      })
    );

    const precioTotal = usuario.cart.precioTotal


    res.render('carrito',{user : req.user , productosEnCarrito, precioTotal});
  } catch (error) {
    console.log('El error es ',error);
    res.render('error404');
  }
}



module.exports = {
    get_carrito,
    agregarAlCarrito,
    eliminarCarrito
}