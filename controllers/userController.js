const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try { res.json(await User.findAll()); }
    catch (err) { res.status(500).json({ message: 'Error fetching users', error: err }); }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err });
    }
};

exports.getUserByEmail = async (req, res) => {
    try {
        // Lấy email từ query parameter
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Tìm user theo email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error("Error fetching user:", err.message);
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const [updated] = await User.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'User not found' });
        res.json(await User.findByPk(req.params.id));
    } catch (err) {
        res.status(400).json({ message: 'Error updating user', error: err });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
};
exports.searchUsersByName = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name is required for search' });
        }

        const users = await User.findAll({
            where: {
                name: {
                    [require('sequelize').Op.like]: `%${name}%`
                }
            }
        });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found with this name' });
        }

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error searching users by name', error: err });
    }
};
