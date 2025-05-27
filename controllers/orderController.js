const { Order, Service ,User,Car} = require('../models');

exports.getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = (page - 1) * limit;

        const result = await Order.findAndCountAll({
            limit,
            offset,
            include: [
                { model: User, attributes: ['name'] },
                { model: Car, attributes: ['name'] }
            ],
            order: [['date', 'DESC']]
        });

        res.json({
            totalItems: result.count,
            totalPages: Math.ceil(result.count / limit),
            currentPage: page,
            orders: result.rows
        });
    } catch (err) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", err);
        res.status(500).json({ message: 'Error fetching orders', error: err.message });
    }
};
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [{ model: Service }]
        });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching order', error: err });
    }
};

exports.createOrder = async (req, res) => {
    const { date, status, UserId, Price, CarId,remaining_price,monthly_interest, serviceIds = [] } = req.body;
    console.log(req.body);
    try {
        const newOrder = await Order.create({ date, status, UserId, Price,remaining_price,monthly_interest, CarId });


        if (serviceIds.length > 0) {
            await newOrder.setServices(serviceIds);
        }

        res.status(201).json(newOrder);
    } catch (err) {
        console.error('Lỗi khi tạo đơn hàng:', err);
        res.status(400).json({ message: 'Error creating order', error: err.message || err });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const [updated] = await Order.update(
            { status: req.body.status },
            { where: { id: req.params.id } }
        );
        if (!updated) return res.status(404).json({ message: 'Order not found' });

        const updatedOrder = await Order.findByPk(req.params.id);
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: 'Error updating order status', error: err });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const deleted = await Order.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting order', error: err });
    }
};

exports.getTotalStats = async (req, res) => {
    try {
        const orders = await Order.findAll();
        const totalRevenue = orders.reduce((sum, order) => sum + (order.Price || 0), 0);
        res.json({
            totalOrders: orders.length,
            totalRevenue,
        });
    } catch (err) {
        console.error("Lỗi khi lấy thống kê:", err);
        res.status(500).json({ message: "Error fetching total stats", error: err.message || err });
    }
};
exports.getOrdersByDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ message: "Missing date query parameter" });
        }

        const orders = await Order.findAll({
            where: { date },
            include: [{ model: Service }, { model: User }, { model: Car }]
        });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Error fetching orders by date", error: err.message || err });
    }
};
exports.updateInstallment = async (req, res) => {
    try {
        const { remaining_price, status } = req.body;
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.remaining_price = remaining_price;
        order.status = status;
        await order.save();

        res.json({ message: "Order installment updated successfully", order });
    } catch (err) {
        console.error("Lỗi khi cập nhật trả góp:", err);
        res.status(500).json({ message: "Error updating installment", error: err.message || err });
    }
};
