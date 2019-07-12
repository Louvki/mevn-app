const bcrypt = require('bcrypt');

const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const correctPassword = (password, compareTo) => {
    return bcrypt.compareSync(password, compareTo);
};

const createToken = (userid) => {
    return JWT.sign({
        sub: userid,
        exp: new Date().getDate() + 1
    }, JWT_SECRET)
};

const validEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
}

const validPassword = (password) => {
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(password);
}

module.exports = { generateHash, correctPassword, createToken, validEmail, validPassword }