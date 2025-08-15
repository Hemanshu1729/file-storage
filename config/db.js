const mongoose = require('mongoose');

let isConnected = false;

async function connectToDB() {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/drive';
        
        const conn = await mongoose.connect(mongoURI, {
            bufferCommands: false,
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log('Connected to MongoDB successfully');
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            isConnected = false;
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            isConnected = false;
        });

    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        isConnected = false;
        // Don't throw error in serverless environment
    }
}

module.exports = connectToDB;