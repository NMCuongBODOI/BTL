const admin = require('../config/firebase');

// Danh sách email admin
const ADMIN_EMAILS = [
    "cuongbx012@gmail.com",
    "cuongbx0123@gmail.com",
    "cuongbx01234@gmail.com"
];

const verifyAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token không hợp lệ" });
    }

    const token = authHeader.split("Bearer ")[1];

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        const userEmail = decoded.email;

        if (!ADMIN_EMAILS.includes(userEmail)) {
            return res.status(403).json({ message: "Bạn không có quyền admin" });
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error("Lỗi xác thực:", err.message);
        return res.status(401).json({ message: "Xác thực thất bại" });
    }
};

module.exports = verifyAdmin;
