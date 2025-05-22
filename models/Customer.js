module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        UserId: DataTypes.INTEGER
    },{
        tableName: 'customer',
            freezeTableName: true
    }
    );
    return Customer;
};
