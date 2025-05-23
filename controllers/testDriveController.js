const db = require('../models');
const TestDrive = db.testDrive;
const User = db.User;
const Car = db.Car;

module.exports = {
  // Tạo đăng ký lái thử mới
  create: async (req, res) => {
    try {
      const { date, time, note, userId, carId } = req.body;

      if (!date || !time || !userId || !carId) {
        return res.status(400).json({ message: 'Thiếu thông tin bắt buộc.' });
      }

      // (Tuỳ chọn) kiểm tra user và car tồn tại
      const user = await User.findByPk(userId);
      const car = await Car.findByPk(carId);

      if (!user || !car) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng hoặc xe.' });
      }

      const testDrive = await TestDrive.create({
        date,
        time,
        note,
        userId,
        carId
      });

      res.status(201).json(testDrive);
    } catch (error) {
      console.error('Lỗi tạo testdrive:', error);
      res.status(500).json({ message: 'Lỗi server khi tạo đăng ký lái thử.' });
    }
  },

  // Lấy danh sách tất cả đăng ký lái thử
  findAll: async (req, res) => {
    try {
      const testDrives = await TestDrive.findAll({
        include: [User, Car],
        order: [['date', 'DESC'], ['time', 'ASC']]
      });

      res.status(200).json(testDrives);
    } catch (error) {
      console.error('Lỗi lấy danh sách testdrive:', error);
      res.status(500).json({ message: 'Lỗi server khi lấy danh sách đăng ký.' });
    }
  },

  // Xóa đăng ký lái thử
  remove: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await TestDrive.destroy({ where: { id } });

      if (deleted === 0) {
        return res.status(404).json({ message: 'Không tìm thấy đăng ký.' });
      }

      res.status(200).json({ message: 'Đã xóa thành công.' });
    } catch (error) {
      console.error('Lỗi xóa testdrive:', error);
      res.status(500).json({ message: 'Lỗi server khi xóa đăng ký.' });
    }
  }
};
