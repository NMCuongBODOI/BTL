const authRoutes = require('./authRoutes');
const carRoutes = require('./carRoutes');
const orderRoutes = require('./orderRoutes');
const testDriveRoutes = require('./testDriveRoutes');
const userRoutes = require('./userRoutes');
const upImage= require('./upload');
const maintenanceRoutes = require('./maintenanceRoutes');
const serviceRoutes = require('./serviceRoutes');
module.exports = {
  authRoutes,
  carRoutes,
  orderRoutes,
  userRoutes,
  upImage,
  maintenanceRoutes,
  serviceRoutes,
  testDriveRoutes
};
