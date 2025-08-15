const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dgffqexow', 
    api_key: process.env.CLOUDINARY_API_KEY || '262445252676854', 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;