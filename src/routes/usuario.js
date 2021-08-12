import express from "express";
import {cadastrar,login} from "../controllers/usuario.js";
const router = express.Router();

router.post('/cadastrar', cadastrar);
router.post('/logar',login);

export default router;