const mongoose = require('mongoose');
const order = {
    sentenceId: { type: String, required: true },
    clientId: { type: String, required: true },
    orderDate: { type: Date, required: true },
    productId: { type: String, required: true },
    style: [{
        textColor: { type: String, default: 'black' },
        backgorundColor: { type: String, default: 'white' },
        fomtFamily: { type: String, default: 'Comic Sans MS", cursive, sans-serif' },
    }],
};

const orderSchema = mongoose.Schema(order);
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
