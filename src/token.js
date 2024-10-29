import jwt from "jsonwebtoken";

const secretKey = "sua_chave_secreta_aqui";

function createToken(id_user) {
    const token = jwt.sign({ id_user }, secretKey, {
        expiresIn: 9999999
    });

    return token;
}

function validateToken(req, res, next){
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).json({error: "Token não informado"});
    }

}

export default { createToken, validateToken };