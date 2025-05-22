// middleware/upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dsscl8qcz',
    api_key: '233734719179222',
    api_secret: 'L2BhbMXqbc1lrMmx68SAJdrVf-k' // Click 'View API Keys' above to copy your API secret
});


module.exports = cloudinary;

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'carshop',
        allowed_formats: ['jpg', 'jpeg', 'png']
    }
});

const upload = multer({ storage }); // <- multer instance

module.exports = upload;
