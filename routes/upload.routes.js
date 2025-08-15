const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { uploadImage, getUserFiles, deleteFile } = require('../controllers/uploadController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes - requires authentication
router.post('/', authenticateToken, upload.single('file'), uploadImage);
router.get('/files', authenticateToken, getUserFiles);
router.delete('/:fileId', authenticateToken, deleteFile);

module.exports = router;
