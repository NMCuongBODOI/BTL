const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User')(sequelize, DataTypes);
const Car = require('./Car')(sequelize, DataTypes);
const Order = require('./Order')(sequelize, DataTypes);
const Review = require('./Review')(sequelize, DataTypes);
const Payment = require('./Payment')(sequelize, DataTypes);
const Employee = require('./Employee')(sequelize, DataTypes);
const MaintenanceOrder = require('./MaintenanceOrder')(sequelize, DataTypes);
const Service = require('./Service')(sequelize, DataTypes);
const OrderService = require('./OrderService')(sequelize, DataTypes); // thêm OrderService

// Khai báo quan hệ nhiều-nhiều giữa Order và Service
Order.belongsToMany(Service, { through: OrderService, foreignKey: 'OrderId' });
Service.belongsToMany(Order, { through: OrderService, foreignKey: 'ServiceId' });

sequelize.sync()
    .then(() => {
        console.log('Các bảng đã được tạo thành công.');
    })
    .catch(err => {
        console.error('Lỗi khi tạo bảng:', err);
    });

module.exports = {
    sequelize,
    User,
    Car,
    Order,
    Review,
    Payment,
    Employee,
    MaintenanceOrder,
    Service,
    OrderService // xuất ra luôn cho tiện sử dụng nếu cần
};
