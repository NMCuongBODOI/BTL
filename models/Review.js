module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        rating: DataTypes.FLOAT,
        comment: DataTypes.STRING,
        reviewerName: DataTypes.STRING,
        CarId: DataTypes.INTEGER,
        EmployeeUserId: DataTypes.INTEGER,
        CustomerUserId2: DataTypes.INTEGER,
        showOnHomepage: { type: DataTypes.BOOLEAN, defaultValue: false }
    },{
        tableName: 'reviews',
        freezeTableName: true
    });
    Review.paginate = async function(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await Review.findAndCountAll({ offset, limit, order: [['id', 'ASC']] });
        return {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: rows
        };
    };
    return Review;
};