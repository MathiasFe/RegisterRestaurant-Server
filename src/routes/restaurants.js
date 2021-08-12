import Express from "express";
import Auth from "../middleware/auth.js";
import {cadastrarRestaurante} from '../controllers/restaurante.js'

const Router =  Express.Router();
// Router.get("/getRestaurantes", Auth,);
Router.post("/cadastrarRestaurant",Auth,cadastrarRestaurante);

export default Router;
