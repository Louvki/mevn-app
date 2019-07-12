const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Types.ObjectId,
        default: '',
    },
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
        default: '',
    },
    coOwners: {
        type: Array,
        default: [],
    }
}, {
        timestamps: true,
    });


module.exports = mongoose.model('Company', CompanySchema);
