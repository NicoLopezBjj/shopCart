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

    res.render('carrito', { user:req.user, productosEnCarrito });
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

    await usuario.agregarAlCarrito(productId, 1); 

    const productosEnCarrito = await Promise.all(usuario.cart.items.map(async (item) => {
      const producto = await Producto.findById(item.productId);
      return {
        cantidad: item.cantidad,
        producto,
      };
    }));

    res.render('carrito', {user : req.user , productosEnCarrito})
  } catch (error) {
    console.error(error);
    res.render('error404')
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
    console.log(productoEliminado)
    
    
    const productosEnCarrito = await Promise.all(
      usuario.cart.items.map(async (item) => {
        const producto = await Producto.findById(item.productId);
        return {
          cantidad: item.cantidad,
          producto,
        };
      })
    );


    res.render('carrito',{user : req.user , productosEnCarrito});
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