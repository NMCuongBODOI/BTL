module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('service', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ten_dich_vu: {
            type: DataTypes.STRING,
            allowNull: false
        },
        thoi_han_dich_vu: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Thời hạn tính theo số ngày'
        },
        gia_tien_dich_vu: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'service',
        timestamps: false
    });

    return Service;
};
