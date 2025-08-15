const cloudinary = require('../config/cloudinary');
const fileModel = require('../models/files.model');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads'
        });

        // Save file info to database with user ID
        const newFile = await fileModel.create({
            path: result.secure_url,
            originalname: req.file.originalname,
            user: req.user._id
        });

        // Remove local file after upload
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.json({
            message: 'File uploaded successfully',
            file: newFile,
            url: result.secure_url
        });

    } catch (error) {
        console.error('Upload error:', error);
        
        // Clean up local file if upload failed
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(500).json({ error: error.message });
    }
};

const getUserFiles = async (req, res) => {
    try {
        const files = await fileModel.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(files);
    } catch (error) {
        console.error('Error getting user files:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        
        // Find file and verify ownership
        const file = await fileModel.findOne({ _id: fileId, user: req.user._id });
        
        if (!file) {
            return res.status(404).json({ message: 'File not found or access denied' });
        }

        // Delete from Cloudinary (optional - you might want to keep files in Cloudinary)
        // const publicId = file.path.split('/').pop().split('.')[0];
        // await cloudinary.uploader.destroy(publicId);

        // Delete from database
        await fileModel.findByIdAndDelete(fileId);

        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { uploadImage, getUserFiles, deleteFile };
