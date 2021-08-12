import  Mongoose  from "mongoose";

const usuarioSchema = Mongoose.Schema({
  senha:{type:String, required:true},
  nome:{type:String,require:true},
  email:{type:String,require:true},
  id:{type:String},
});

const usuario = Mongoose.model("Usuario",usuarioSchema);
export default usuario;