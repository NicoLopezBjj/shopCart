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
    enum:['Staples','Sprouts','GroceryOutlet','MollieStones','SportsBasement','ContainerStore','Target','Bevmo!']
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
  },
  minishop:{
    type:Boolean
  }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
