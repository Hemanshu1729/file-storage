const mongoose = require('mongoose');

function connectToDB() {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/drive';
    
    mongoose.connect(mongoURI)
        .then(() => {
            console.log('Connected to MongoDB successfully');
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error.message);
            // Don't exit the process, let the app continue
            // The app can still serve static files and handle requests
        });
}

module.exports = connectToDB;