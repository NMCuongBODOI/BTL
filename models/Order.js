module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'Order',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            date: DataTypes.DATE,
            status: DataTypes.STRING,
            UserId: DataTypes.INTEGER,
            Price: DataTypes.INTEGER,
            CarId: DataTypes.INTEGER,
            remaining_price: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            monthly_interest: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },
        },
        {
            tableName: 'order',
            freezeTableName: true,
            timestamps: false,
        }
    );

    // 👇 Quan hệ nhiều-nhiều với Service thông qua bảng trung gian OrderService
    Order.associate = function (models) {

        Order.belongsToMany(Service, { through: 'OrderService', foreignKey: 'OrderId' });
        Service.belongsToMany(Order, { through: 'OrderService', foreignKey: 'ServiceId' });

    };

    // 👇 Phân trang
    Order.paginate = async function (page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await Order.findAndCountAll({
            offset,
            limit,
            order: [['id', 'ASC']],
            include: ['Services'], // nếu muốn preload luôn dịch vụ
        });
        return {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: rows,
        };
    };
    Order.associate = (models) => {
        Order.belongsTo(models.User, { foreignKey: 'UserId' });
        Order.belongsTo(models.Car, { foreignKey: 'CarId' });
    };

    return Order;
};
