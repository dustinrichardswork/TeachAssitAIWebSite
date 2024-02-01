const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const verifiedUserSchema = new mongoose.Schema({
    token: String
});




module.exports = mongoose.model('VerifiedUser', verifiedUserSchema);