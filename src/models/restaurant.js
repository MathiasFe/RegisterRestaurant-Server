import Mongoose from "mongoose";

const restaurantShema = Mongoose.Schema({
      id: {type:String},
      nome:{type:String, require:true},
      redeInsta:{type:String},
      redeFace:{type:String},
      redeGoogle:{type:String},
      enderecoRua:{type:String},
      enderecoNumero:{type:String},
      cep:{type:String},
      categoriaId:{type:String, require:true},
      avaliacao:{type:String},
      usuarioId:{type:String, require:true}
});

const Restaurant = Mongoose.model("Restaurante",restaurantShema );
export default Restaurant;