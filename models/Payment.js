module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        status: DataTypes.STRING,
        paymentMethod: DataTypes.STRING,
        totalPay: DataTypes.INTEGER,
        MaintenanceOrderId: DataTypes.INTEGER,
        CustomerId:DataTypes.INTEGER
    },{
        tableName: 'payment',
        freezeTableName: true
    });
    Payment.paginate = async function(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await Payment.findAndCountAll({ offset, limit, order: [['id', 'ASC']] });
        return {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: rows
        };
    };
    return Payment;
};