const User = require ('../models/User')
const Producto = require ('../models/Products')


const get_carrito = async (req,res) =>{
  try {
    const usuario = await User.findById(req.user._id);
    
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const productosEnCarrito = usuario.cart.items;

    res.render('carrito', { user:req.user, productosEnCarrito });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener productos del carrito' });
  }
};
const agregarAlCarrito = async (req, res) => {
  const { productId } = req.body;
  // console.log(req.body)

  try {
    const usuario = await User.findById(req.user._id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await usuario.agregarAlCarrito(productId, 1); // Cambia la cantidad según tu lógica

    return res.status(200).json({ mensaje: 'Producto agregado al carrito exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al agregar producto al carrito' });
  }
};



module.exports = {
    get_carrito,
    agregarAlCarrito,
}