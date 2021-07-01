const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  name: String,
  value: String,
});

module.exports = mongoose.model('Setting', SettingSchema, 'settings');
