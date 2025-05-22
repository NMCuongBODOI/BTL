const admin = require('firebase-admin');
const serviceAccount = require('../carstore-c8d1e-firebase-adminsdk-fbsvc-975c9435a8.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
