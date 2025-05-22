module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        avatar: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING
    },{
        tableName: 'user',
        freezeTableName: true
    });
    return User;
};