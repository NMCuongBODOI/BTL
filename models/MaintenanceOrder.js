module.exports = (sequelize, DataTypes) => {
    const MaintenanceOrder = sequelize.define('MaintenanceOrder', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        status: DataTypes.STRING,
        expectedDate: DataTypes.DATE,
        address: DataTypes.STRING,
        UserId: DataTypes.INTEGER,
        phone:DataTypes.STRING
    }, {
        tableName: 'maintenanceorders',
        freezeTableName: true
    });
    MaintenanceOrder.associate = function(models) {
        MaintenanceOrder.belongsTo(models.User, { foreignKey: 'UserId' });
    };
    return MaintenanceOrder;
};
