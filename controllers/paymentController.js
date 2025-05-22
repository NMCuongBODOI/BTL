const { Payment } = require('../models');

exports.getAllPayments = async (req, res) => {
    try { const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const result = await Payment.paginate(page, limit);
        res.json({ totalItems: result.totalItems, totalPages: result.totalPages, currentPage: result.currentPage, payments: result.data }); }
    catch (err) { res.status(500).json({ message: 'Error fetching payments', error: err }); }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.json(payment);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching payment', error: err });
    }
};

exports.createPayment = async (req, res) => {
    try { res.status(201).json(await Payment.create(req.body)); }
    catch (err) { res.status(400).json({ message: 'Error creating payment', error: err }); }
};