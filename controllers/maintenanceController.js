const { MaintenanceOrder, User } = require('../models');


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

// Lấy tất cả đơn bảo trì (có thông tin khách hàng)
exports.getAllMaintenanceOrders = async (req, res) => {
    try {
        const orders = await MaintenanceOrder.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'phone'],
                },
            ],
        });

        // Định dạng dữ liệu cho gọn
        const formatted = orders.map((order) => ({
            id: order.id,
            status: order.status,
            expectedDate: order.expectedDate,
            address: order.address,
            phone: order.phone,
            customerName: order.User?.name || 'Không xác định',
            customerPhone: order.User?.phone || 'Không xác định',
            UserId:order.UserId,
        }));

        res.json(formatted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Lấy đơn bảo trì có status = 'pending'
exports.getPendingMaintenanceOrders = async (req, res) => {
    try {
        const pendingOrders = await MaintenanceOrder.findAll({
            where: { status: 'pending' },
            include: [
                {
                    model: User,
                    attributes: ['name', 'phone'],
                },
            ],
        });

        const formatted = pendingOrders.map((order) => ({
            id: order.id,
            status: order.status,
            expectedDate: order.expectedDate,
            address: order.address,
            phone: order.phone,
            customerName: order.User?.name || 'Không xác định',
            customerPhone: order.User?.phone || 'Không xác định',
        }));

        res.json(formatted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Cập nhật trạng thái đơn
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
exports.deleteMaintenanceOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await MaintenanceOrder.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Đơn không tồn tại' });
        }
        await order.destroy();
        res.json({ message: 'Xóa đơn thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};
