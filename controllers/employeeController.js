const { Employee, Car} = require('../models');

exports.getAllEmployees = async (req, res) => {
    try {

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const result = await Employee.paginate(page, limit);
        res.json({ totalItems: result.totalItems, totalPages: result.totalPages, currentPage: result.currentPage, employees: result.data });
    }
    catch (err) { res.status(500).json({ message: 'Error fetching employees', error: err }); }
};

exports.createEmployee = async (req, res) => {
    try { res.status(201).json(await Employee.create(req.body)); }
    catch (err) { res.status(400).json({ message: 'Error creating employee', error: err }); }
};

exports.updateEmployee = async (req, res) => {
    try {
        console.log('ID nhận được:', req.params.id);
        const [updated] = await Employee.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Employee not found' });
        res.json(await Employee.findByPk(req.params.id));
    } catch (err) {
        res.status(400).json({ message: 'Error updating employee', error: err });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employee.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting employee', error: err });
    }
};

