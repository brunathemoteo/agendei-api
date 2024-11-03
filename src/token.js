import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "sua_chave_secreta_aqui";

function createToken(id_user) {
    const token = jwt.sign({ id_user }, secretKey, {
        expiresIn: 9999999, // Defina um prazo de expiração mais curto para maior segurança
    });

    return token;
}

function validateToken(req, res, next) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: "Token não informado" });
    }

    const [bearer, token] = authToken.split(" ");

    if (bearer !== "Bearer") {
        return res.status(401).json({ error: "Formato de token inválido" });
    }

    jwt.verify(token, secretKey, (err, tokenDecoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido" });
        }

        req.id_user = tokenDecoded.id_user;
        next();
    });
}

export default { createToken, validateToken };
