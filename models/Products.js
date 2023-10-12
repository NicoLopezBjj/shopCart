const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type:String,
    required:true
},
  precio:{ 
    type:Number,
    required:true
},
  marca: {
    type:String,
    required:true,
    enum:['Staples','Sprouts','Grocery outlet','Mollie stones','Sports Basement','Container Store','Target','Bevmo!']
},
  imagen:{
    type: String,
    required:true      
}, 
  descripcion:{
    type:String
},
  categoria:{
    type:String,
    required:true
},
  color:{
    type:String
  }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;