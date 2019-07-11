const mongoose = require('mongoose');


const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
}, {
        timestamps: true,
    });


module.exports = mongoose.model('Company', CompanySchema);
