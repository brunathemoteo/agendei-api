import jwt from "jsonwebtoken";

const secretKey = "sua_chave_secreta_aqui";

function createToken(id_user) {
    const token = jwt.sign({ id_user }, secretKey, {
        expiresIn: 9999999
    });

    return token;
}

function validateToken(req, res, next){
    const authToken = req.headers.authorization; // "Bearer 00000000"

    if(!authToken) {
        return res.status(401).json({error: "Token não informado"});
    }

    const [bearer, token] = authToken.split(" "); // "Bearer" "00000000"

    jwt.verify(token, secretKey, (err, tokenDecoded) => {
        
        if (err){
            return res.status(401).json({error: "Token inválido"});
        }

        req.id_user = tokenDecoded.id_user;

        next();

    })

}

export default { createToken, validateToken };