import Mongoose from "mongoose";
import Restaurant from '../models/restaurant.js';
import Usuario from '../models/usuario.js'
import Categoria from '../models/categoria.js'
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import Crypto from 'crypto';

export const cadastrarRestaurante = async (req, res) => {
  const {
    nome,
    enderecoRua,
    enderecoNumero,
    avaliacao,
    usuarioId,
    redeFace,
    redeInsta,
    redeGoogle
  } = req.body;

  try {

    if (!req.idUsuario)
      return res.status(401).json({ message: "Usuário não autenticado" });

    if (!nome)
      res.status(404).json(
        { validacaoError: "Nome do restaurante é invalido" })

    if (!categoriaId)
      res.status(404).json(
        { validacaoError: "É necessaroio selecionar uma categoria" });

    const categoriaExistente = await Categoria.findById({ _id: categoriaId });

    if (!categoriaExistente)
      res.status(404).json(
        { validacaoError: "Categoria Selecionada é invalida" });


    const usuarioExistente = await Usuario.findById({ _id: categoriaExistente._id });

    if (!usuarioExistente)
      res.status(404).json({ validacaoError: "É necessario estar logado" });

    const novoRestaurant = await Restaurant.create({
      nome,
      redeInsta,
      redeFace,
      redeGoogle,
      enderecoRua,
      enderecoNumero,
      cep,
      categoriaId,
      avaliacao,
      usuarioId
    })

    res.status(200).json({ result: novoRestaurant });

  } catch (error) {
    return res.status(500).json({ mensagem: `Algo deu Errado: ${error}` })
  }

}

export const getRestaurant = async (req, res) => {

  try {
    if (!req.idUsuario)
      return res.status(401).json({ message: "Usuário não autenticado" });

    const restaurante = await Restaurant.find({usuarioId:idUsuario});

    res.status(200).json({restaurante});

  } catch (error) {

  }



}