const { MaintenanceOrder } = require('../models');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');
exports.createMaintenanceOrder = async (req, res) => {
    try {
        console.log(req.body);
        const order = await MaintenanceOrder.create(req.body);

        res.status(201).json(order);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error creating maintenance order', error: err });
    }
};
exports.getAllMaintenanceOrders = async (req, res) => {
        try {
            const orders = await MaintenanceOrder.findAll();
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server' });
        }
    };

    // API lấy MaintenanceOrder có status = 'pending'
    exports.getPendingMaintenanceOrders = async (req, res) => {
        try {
            const pendingOrders = await MaintenanceOrder.findAll({
                where: { status: 'pending' }
            });
            res.json(pendingOrders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server' });
        }
    };
    exports.updateOrderStatus = async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        try {
            const order = await MaintenanceOrder.findByPk(id);
            if (!order) {
                return res.status(404).json({ message: 'Đơn không tồn tại' });
            }

            order.status = status;
            await order.save();

            res.json({ message: 'Cập nhật trạng thái thành công', order });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server' });
        }
    };