const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/', paymentController.getAllPayments);     // GET /api/payments
router.post('/', paymentController.createPayment);    // POST /api/payments
router.get('/:id', paymentController.getPaymentById); // GET /api/payments/:id

module.exports = router;