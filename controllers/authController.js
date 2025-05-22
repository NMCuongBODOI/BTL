const { User } = require('../models');
const admin = require('../config/firebase');
const ADMIN_EMAILS = [
    "cuongbx012@gmail.com",
    "cuongbx0123@gmail.com",
    "cuongbx01234@gmail.com"
];

exports.login = async (req, res) => {
    const authHeader = req.headers.authorization;
    console.log("Header Authorization:", authHeader);

    const token = authHeader.split(" ")[1];
    console.log("Token nhận được:", token);

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        const email = decoded.email;
        console.log(email);
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });
        console.log(2);
        // ➕ Thêm thông tin role
        const role = ADMIN_EMAILS.includes(email) ? "admin" : "user";
        console.log(3);
        // ➕ Gửi về FE cả user và role
        res.json({
            user: {
                ...user.toJSON(), // để chuyển từ Sequelize instance sang plain object
                role: role
            }
        })
        console.log(4);
    } catch (err) {
        console.log(5);
        console.error("Lỗi đăng nhập:", err);
        res.status(500).json({ message: "Lỗi xác thực token" });

    }
};

// Đăng ký tài khoản: nhận token từ client và lưu thông tin người dùng vào DB
exports.signup = async (req, res) => {
    const { token, avatar, role = 0 } = req.body;

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        const { uid, name, email } = decoded;
        console.log(decoded);
        const [user, created] = await User.findOrCreate({
            where: { username: uid },
            defaults: {
                name: name ,
                username: uid,
                email: email,
                avatar,
                role
            }
        });


        res.status(created ? 201 : 200).json(user);
    } catch (err) {
        res.status(400).json({ message: 'Firebase signup failed', error: err.message });
    }
};



// Xác minh token (tuỳ chọn)
exports.verifyToken = async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        res.json({ valid: true, decoded });
    } catch {
        res.status(401).json({ valid: false });
    }
};
