require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const gerarToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: '8h' });
}

module.exports = gerarToken