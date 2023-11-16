const User = require ('../models/User')
const Producto = require ('../models/Products')

const agregarAFavoritos = async (req, res) => {
    try {
      const { productId } = req.body;
      const usuario = await User.findById(req.user._id);
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      const existeEnFavoritos = usuario.favoritos.includes(productId);
  
      if (existeEnFavoritos) {
        return res.status(400).json({ mensaje: 'El producto ya está en la lista de favoritos' });
      }
  
      usuario.favoritos.push(productId);
      await usuario.save();
      return res.status(200).json({ mensaje: 'Producto agregado a favoritos correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };
  

  // Obtener la lista de favoritos del usuario autenticado
const obtenerFavoritos = async (req, res) => {
    try {
      // Accede al usuario autenticado a través de req.user
      const usuario = req.user;
  
      if (!usuario) {
        return res.status(401).json({ mensaje: 'Usuario no autenticado' });
      }
  
      // Populate para obtener los detalles de los productos favoritos
      await usuario.populate('favoritos').execPopulate();
      res.render('favoritos', { favoritos: usuario.favoritos, user : req.user });
    } catch (error) {
      return res.status(500).json({ mensaje: 'Error al obtener favoritos', error: error.message });
    }
}
  
  module.exports = { agregarAFavoritos, obtenerFavoritos}