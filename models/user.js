const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }]
});

module.exports = mongoose.model('User', userSchema);