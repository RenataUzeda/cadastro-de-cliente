require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const gerarToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: '8h' });
}

const verificarToken = (token) =>  {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
}

module.exports = { gerarToken, verificarToken };
