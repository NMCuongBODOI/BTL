const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/by-date', orderController.getOrdersByDate);
router.get('/total-stats', orderController.getTotalStats);

router.get('/', orderController.getAllOrders);   
router.post('/', orderController.createOrder);

router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrderStatus);
router.put('/:id/installment', orderController.updateInstallment);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
