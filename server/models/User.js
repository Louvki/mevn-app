const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    companies: {
        type: Object,
        default: {},
    },
    companiesPartner: {
        type: Object,
        default: {},
    }
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
