const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const createToken = (user) => {
    // Tokens are valid for one day
    return JWT.sign({ userid: user.id }, JWT_SECRET, { expiresIn: '24h' })
}

const verifyToken = (token) => {
    return JWT.verify(token, JWT_SECRET);
}

const validEmail = (email) => {
    const emailRegex = /[^@]+@[^\.]+\..+/;
    return emailRegex.test(email);
}

const validPassword = (password) => {
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(password);
}

module.exports = { createToken, verifyToken, validEmail, validPassword }