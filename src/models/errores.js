const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ErrorSchema = new Schema({
  fecha: String,
  codigo: String,
  descripcion: String,
  status: String
});

module.exports = mongoose.model('Error', ErrorSchema);
