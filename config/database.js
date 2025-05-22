// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('carshop', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false  // <== tắt timestamps cho tất cả các model
    }
});

module.exports = sequelize;
