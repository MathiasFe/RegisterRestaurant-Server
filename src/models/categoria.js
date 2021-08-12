import Mongoose  from "mongoose";

const categoriaSchema = Mongoose.Schema({
  id:String,
  nome:{type:String,require:true},
});

const Categoria = Mongoose.model("Categoria",categoriaSchema);
export default Categoria;
