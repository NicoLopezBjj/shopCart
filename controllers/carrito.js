const Carrito = require ('../models/Carrito')


const get_carrito = async (req,res) =>{
    res.render('carrito',{user : req.user})
}

const agregarAlCarrito = async (req, res) =>{
    try {
        const { productoId, cantidad, precioUnitario } = req.body;
        const carrito = await Carrito.findOneAndUpdate(
          { usuario: req.user._id }, 
          {
            $push: {
              productos: {
                producto: productoId,
                cantidad,
                precioUnitario,
              }
            }
          },
          { new: true, upsert: true }
        );
    
        // Calcular el nuevo total del carrito
        carrito.total = carrito.productos.reduce((total, producto) => {
          return total + (producto.cantidad * producto.precioUnitario);
        }, 0);
        await carrito.save();
    
        res.redirect('/carrito'); 
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar al carrito');
      }
    }



module.exports = {
    get_carrito,
    agregarAlCarrito
}