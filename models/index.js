const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Khởi tạo models
const User = require('./User')(sequelize, DataTypes);
const Car = require('./Car')(sequelize, DataTypes);
const Order = require('./Order')(sequelize, DataTypes);
const MaintenanceOrder = require('./MaintenanceOrder')(sequelize, DataTypes);
const Service = require('./Service')(sequelize, DataTypes);
const OrderService = require('./OrderService')(sequelize, DataTypes);
const testDrive = require('./testDrive')(sequelize, DataTypes);

// === Các mối quan hệ (chỉ ở mức Sequelize, không dùng ràng buộc DB vật lý) ===

// Order liên kết với User và Car (1-nhiều)
Order.belongsTo(User, { foreignKey: 'UserId', constraints: false });
Order.belongsTo(Car, { foreignKey: 'CarId', constraints: false });
User.hasMany(Order, { foreignKey: 'UserId', constraints: false });
Car.hasMany(Order, { foreignKey: 'CarId', constraints: false });

// Order liên kết nhiều-nhiều với Service qua OrderService
Order.belongsToMany(Service, { through: OrderService, foreignKey: 'OrderId', constraints: false });
Service.belongsToMany(Order, { through: OrderService, foreignKey: 'ServiceId', constraints: false });

// MaintenanceOrder liên kết với User
MaintenanceOrder.belongsTo(User, { foreignKey: 'UserId', constraints: false });
User.hasMany(MaintenanceOrder, { foreignKey: 'UserId', constraints: false });

// ** Thêm quan hệ testDrive với User và Car **
testDrive.belongsTo(User, { foreignKey: 'UserId', constraints: false });
User.hasMany(testDrive, { foreignKey: 'UserId', constraints: false });

testDrive.belongsTo(Car, { foreignKey: 'CarId', constraints: false });
Car.hasMany(testDrive, { foreignKey: 'CarId', constraints: false });

// Sync DB nếu cần (chỉ khi dùng development)
sequelize.sync()
    .then(() => {
        console.log('Các bảng đã được tạo thành công.');
    })
    .catch(err => {
        console.error('Lỗi khi tạo bảng:', err);
    });

// Export tất cả models và sequelize
module.exports = {
    sequelize,
    Sequelize,
    User,
    Car,
    Order,
    MaintenanceOrder,
    Service,
    OrderService,
    testDrive
};
