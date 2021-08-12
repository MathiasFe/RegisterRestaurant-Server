import express from "express";
import usuarioRoutes from "./routes/usuario.js";
import restauranteRoutes from "./routes/restaurants.js";
import Cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";

const app = express();
// server para poder pegar dados do .env
dotenv.config();
app.use(Cors());
app.use(express.json());
app.use("/usuario", usuarioRoutes);
app.use("/restaurante/cadastro", restauranteRoutes);
const Port = process.env.PORT || 5000;


const CONNECTION_URL = process.env.connection_url;

mongoose.connect(
  CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>
  app.listen(Port,()=>console.log('Initiation System'))
)
.catch((error) => console.log(`error: ${error.message}`));

mongoose.set("useFindAndModify",false);


