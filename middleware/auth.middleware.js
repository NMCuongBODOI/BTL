const admin = require('../config/firebase');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Header Authorization:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token không hợp lệ (header sai)' });
    }

    const token = authHeader.split('Bearer ')[1];
    console.log("Token nhận được:", token);

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Lỗi xác thực:", error.message);
        res.status(401).json({ message: 'Xác thực thất bại' });
    }
};

module.exports = authenticate;
