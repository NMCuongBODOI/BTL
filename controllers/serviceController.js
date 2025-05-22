const { Service } = require('../models');

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services)
        console.log(services);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách dịch vụ' });
    }
};

// Lấy dịch vụ theo ID
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) return res.status(404).json({ error: 'Không tìm thấy dịch vụ' });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy dịch vụ' });
    }
};

// Thêm dịch vụ
exports.createService = async (req, res) => {
    try {
        const { ten_dich_vu, thoi_han_dich_vu, gia_tien_dich_vu } = req.body;
        const newService = await Service.create({ ten_dich_vu, thoi_han_dich_vu, gia_tien_dich_vu });
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tạo dịch vụ' });
    }
};

// Cập nhật dịch vụ
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Service.update(req.body, { where: { id } });
        if (!updated) return res.status(404).json({ error: 'Không tìm thấy dịch vụ để cập nhật' });
        const updatedService = await Service.findByPk(id);
        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi cập nhật dịch vụ' });
    }
};

// Xóa dịch vụ
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Service.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ error: 'Không tìm thấy dịch vụ để xóa' });
        res.json({ message: 'Xóa dịch vụ thành công' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa dịch vụ' });
    }
};
