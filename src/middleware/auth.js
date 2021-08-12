import jwt from 'jsonwebtoken';

const Auth = async (req, res, next) => {
  if (req.headers.authorization === "" || req.headers.authorization === undefined)
    return res.status(401).json(
      { validationError: "É necessario estar logado para efetuar a ação!" });
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token,process.env.TOKEN_ACSS).then(response => {
        next();
      }).catch((response) =>{
        return res.status(500).json(
          {mensagem: `Algo deu Errado:  ${response.data}`})
      })
}

export default Auth;