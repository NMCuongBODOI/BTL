const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.getAllEmployees);      // GET /api/employees
router.post('/', employeeController.createEmployee);     // POST /api/employees
router.put('/:id', employeeController.updateEmployee);   // PUT /api/employees/:id
router.delete('/:id', employeeController.deleteEmployee);// DELETE /api/employees/:id

module.exports = router;
