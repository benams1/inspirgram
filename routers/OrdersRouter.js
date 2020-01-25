const { Router } = require('express');
const OrdersRouter = new Router();
const { getAllOrders,
    getAllClientOrders,
    addOrder,
    updateOrder,
    deleteOrder } = require('../controllers/OrdersController');

//path = /orders/getAllOrders
OrdersRouter.get('/getAllOrders', getAllOrders);

//path = /orders/getAllClientOrders/<userId>
OrdersRouter.get('/getAllClientOrders/:clientId', getAllClientOrders);

//path = /orders/addOrder
OrdersRouter.post('/addOrder', addOrder);

//path = /ordresupdateOrder/<orderId>
OrdersRouter.put('/updateOrder/:orderId', updateOrder);

//path = /orders/deleteOrder/<orderId>
OrdersRouter.delete('/deleteOrder/:orderId', deleteOrder);

module.exports = OrdersRouter;