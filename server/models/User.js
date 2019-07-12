const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: '',
    },
}, {
        timestamps: true,
    });


UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12));
    next();
});

UserSchema.methods.isValidPassword = function (newPassword) {
    return bcrypt.compareSync(newPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);
