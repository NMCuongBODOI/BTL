const express = require('express');
const router = express.Router();
const maintenanceCtrl = require('../controllers/maintenanceController');

// Tạo đơn bảo trì mới
router.post('/', maintenanceCtrl.createMaintenanceOrder);

// Lấy tất cả MaintenanceOrder
router.get('/all', maintenanceCtrl.getAllMaintenanceOrders);

// Lấy MaintenanceOrder có status = 'pending'
router.get('/pending', maintenanceCtrl.getPendingMaintenanceOrders);

// Cập nhật trạng thái đơn (ví dụ: xác nhận đã xử lý)
router.put('/:id/status', maintenanceCtrl.updateOrderStatus);

module.exports = router;
