const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
router.get('/by-date', orderController.getOrdersByDate);

router.get('/', orderController.getAllOrders);              // GET /api/orders
router.post('/', orderController.createOrder);             // POST /api/orders
router.get('/total-stats', orderController.getTotalStats);
router.get('/:id', orderController.getOrderById);          // GET /api/orders/:id
router.put('/:id', orderController.updateOrderStatus);     // PUT /api/orders/:id
router.delete('/:id', orderController.deleteOrder);        // DELETE /api/orders/:id

module.exports = router;
