module.exports = (sequelize, DataTypes) => {
    const TestDrive = sequelize.define('testdrive', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        carId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'testdrive',
        timestamps: false
    });

    TestDrive.associate = (models) => {
        TestDrive.belongsTo(models.User, { foreignKey: 'userId', as: 'user', constraints: false });
        TestDrive.belongsTo(models.Car, { foreignKey: 'carId', as: 'car', constraints: false });
    };
    TestDrive.associate = (models) => {
        TestDrive.belongsTo(models.User, { foreignKey: "userId" });
        TestDrive.belongsTo(models.Car, { foreignKey: "carId" });
    };
    return TestDrive;
};
