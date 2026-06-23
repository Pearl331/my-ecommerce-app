const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  customer: String,
  items: Array,
  total: Number,
  address: String
});
module.exports = mongoose.model('Order', orderSchema);