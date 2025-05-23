module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define('Car', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        type: DataTypes.STRING,
        color: DataTypes.STRING,
        description: DataTypes.TEXT,
        totalKm: DataTypes.INTEGER,
        brand: DataTypes.STRING,
        image:DataTypes.TEXT
    },{

        tableName: 'car',
        freezeTableName: true
        }
    );

    // Static method phân trang
    Car.paginate = async function(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await Car.findAndCountAll({ offset, limit, order: [['id', 'ASC']] });
        return {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: rows
        };
    };
    Car.associate = (models) => {
        Car.hasMany(models.Order, { foreignKey: 'CarId' });
    };

    return Car;
};
