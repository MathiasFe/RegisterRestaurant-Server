import Mongoose from "mongoose";
import Usuario from '../models/usuario.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import Crypto from 'crypto';

export const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente)
      return res.status(404).json({ validacaoError: "Este email já esta cadastrado." })

    if (senha.length < 6)
      return res.status(404).json({ validacaoError: "A senha deve conter mais de 6 digitos" })

    const hashedSenha = await bcrypt.hash(senha, 12);

    const result = await Usuario.create({
      email,
      senha: hashedSenha,
      nome,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.TOKEN_Acss,
      {
        expiresIn: "1h",
      }
    );

    const novoUsuario = await Usuario.findById(result._id);
    result.usuario = novoUsuario;

    res.status(200).json({ result: result, token });

    //sendEmail

  } catch (error) {
    res.status(500).json({ message: error.message });
  }



}

export const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    if (!email)
      return res.status(404).json({ validacaoError: "Email informado é invalido" })
    if (!senha)
      return res.status(404).json({ validacaoError: "Senha informada é invalida" });

    const usuarioExistente = await Usuario.findOne({ email });
    if (!usuarioExistente)
      return res.status(404).json({ validacaoError: "Credenciais Invalidas" });

    const isSenhaCerta = await bcrypt.compare(senha, usuarioExistente.senha)
    if (!isSenhaCerta)
      return res.status(404).json({ validacaoError: "Credenciais Invalidas" });

    const token = jwt.sign(
      { email: usuarioExistente.email, id: usuarioExistente._id },
      process.env.TOKEN_ACSS,
      { expiresIn: "1h", }
    );

    res.status(200).json({ result: usuarioExistente, token })


  } catch (error) {
    res.status(500).json({ message: `Algo deu Errado: ${error}` })
  }


}

export const esqueciSenha = async (req, res) => {
  const { email } = res.body;
  try {
    if (!email)
      return res.status(404).json(
        { validacaoError: "Email informado é invalido" })

    const usuarioExistente = await Usuario.findOne({ email });
    if (!usuarioExistente)
      return res.status(404).json(
        { validacaoError: "Não consta nenhum usuario cadastrado com esse e-mail" })

    const tokenReset = Crypto.randowBytes(20).toString("hex");

    const dataNow = new Date();
    dataNow.getTime.setHours(dataNow.getHours() + 1);

    await Usuario.findByIdAndUpdate(usuarioExistente._id, {
      tokenResetSenha: tokenReset,
      tokenResetExpiracao: dataNow,
    })

    res.status(200).json(
      { result: "Foi encaminhado um link para seu e-mail com o reset de senha" });



  } catch (error) {
    res.status(500).json(
      { message: `Algo deu Errado: ${error}` });
  }
}

export const alterarSenhaToken = async (req, res) => {
  const { token, senha } = req.body;

  try {
    if (!token)
      return res.status(401).json(
        { validacaoError: "Você não posssui permissão para realizar a ação desejada!!" });

    if (!senha)
      return res.status(404).json(
        { validacaoError: "Senha informada é invalida" });

    const usuarioExistente = Usuario.findOne({ tokenResetSenha: token });

    if (!usuarioExistente)
      return res.status(401).json(
        { validacaoError: "Você não posssui permissão para realizar a ação desejada!!" });

    let data = new Date();

    if (data > usuarioExistente.tokenResetExpiracao)
      return res.status(404).json(
        { validacaoError: "A alteração de senha expirou, por favor solicite um novo token" })

    const hashedSenha = bcrypt.hash(senha, 12);

    await Usuario.findByIdAndUpdate(usuarioExistente._id,
      { senha: hashedSenha, });

      res.status(404).json({result:"Senha alterada com sucesso"})

  } catch (error) {
    res.status(500).json(
      { message: `Algo deu errado: ${error}` })
  }


}

const alterarSenha =async (req,res) => {

}



