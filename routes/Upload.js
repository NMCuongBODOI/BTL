const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/', upload.single('image'), async (req, res) => {
    try {
        res.json({ url: req.file.path });
    } catch (err) {
        res.status(500).json({ message: 'Upload failed', error: err.message });
    }
});

module.exports = router;
