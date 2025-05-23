const express = require('express');
const router = express.Router();
const testDriveController = require('../controllers/testDriveController');


router.post('/', testDriveController.create);
router.get('/', testDriveController.findAll);
router.delete('/:id',  testDriveController.remove);

module.exports = router;
