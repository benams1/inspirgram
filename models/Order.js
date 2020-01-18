const mongoose = require('mongoose');
const order = {

};

const orderSchema = mongoose.Schema(order);
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
