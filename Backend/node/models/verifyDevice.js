const mongoose = require('mongoose');

const verifyDeviceSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('VerifyDevice', verifyDeviceSchema);