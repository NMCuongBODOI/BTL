module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {

        name: DataTypes.STRING,
        salary: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER,
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    },{
        tableName: 'employee',
        freezeTableName: true
    });
    Employee.paginate = async function(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await Employee.findAndCountAll({ offset, limit, order: [['id', 'ASC']] });
        return {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: rows
        };
    };
    return Employee;
};