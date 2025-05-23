const express = require('express');
const router = express.Router();
const maintenanceCtrl = require('../controllers/maintenanceController');

router.post('/', maintenanceCtrl.createMaintenanceOrder);

router.get('/all', maintenanceCtrl.getAllMaintenanceOrders);

// Lấy MaintenanceOrder có status = 'pending'
router.get('/pending', maintenanceCtrl.getPendingMaintenanceOrders);
router.put('/:id/status', maintenanceCtrl.updateOrderStatus);
router.delete('/:id', maintenanceCtrl.deleteMaintenanceOrder);
module.exports = router;
