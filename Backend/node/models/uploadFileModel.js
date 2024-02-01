const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId, // Assuming user_id is a reference to a User model
    ref: 'User',
    required: true,
  },
  chat_id: {
    type: mongoose.Schema.ObjectId, // Assuming user_id is a reference to a User model
    ref: 'ChatHistory',
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  file_size: {
    type: Number,
    required: true,
  },
  upload_date: {
    type: Date,
    default: Date.now,
  },
});

const UploadFile = mongoose.model('UploadFile', uploadSchema);

module.exports = UploadFile;
