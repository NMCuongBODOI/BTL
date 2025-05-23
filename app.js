    const express = require('express');
    const cors = require('cors');

    const app = express();


    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));

    app.use(express.json());
    // app.js

    require('dotenv').config();


    // Sequelize instance
    const sequelize = require('./config/database');

    // Auth middleware
    const auth = require('./middleware/auth.middleware');

    // Import routes
    const {
        authRoutes,
        userRoutes,
        carRoutes,
        orderRoutes,
        upImage,
        maintenanceRoutes,
        serviceRoutes, testDriveRoutes
    } = require('./routes');

    app.use(express.json());

    // Public routes
    app.use('/api/auth', authRoutes);
    // Protected routes
    app.use('/api/users', userRoutes);
    app.use('/api/cars', carRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/upload',upImage);
    app.use('/api/maintenances',maintenanceRoutes);
    app.use('/api/services', serviceRoutes);
    app.use('/api/testDrive', testDriveRoutes);
    // Start server
    const PORT = process.env.PORT || 3000;

    sequelize.sync({ force: false})
        .then(() => {
            console.log(' Kết nối MySQL thành công');
            return sequelize.sync(); // Sync models
        })
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        })
        .catch(err => {
            console.error(' Lỗi kết nối hoặc sync DB:', err);
        });

    module.exports = app;
