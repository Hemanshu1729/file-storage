const multer = require('multer');

// Use memory storage for serverless environments
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // Accept images, documents, and other common file types
    if (file.mimetype.startsWith('image/') || 
        file.mimetype.startsWith('application/') || 
        file.mimetype.startsWith('text/') ||
        file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 4 * 1024 * 1024 // 4MB limit for Vercel
    }
});

module.exports = upload;
