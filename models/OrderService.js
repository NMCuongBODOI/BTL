module.exports = (sequelize, DataTypes) => {
    const OrderService = sequelize.define(
        'OrderService',
        {
            OrderId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            ServiceId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
        },
        {
            tableName: 'orderservice',
            freezeTableName: true,
            timestamps: false,
        }
    );

    return OrderService;
};
