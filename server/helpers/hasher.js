const bcrypt = require('bcrypt');

const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const validPassword = (password, compareTo) => {
    return bcrypt.compareSync(password, compareTo);
};

module.exports = { generateHash, validPassword }