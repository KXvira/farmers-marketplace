const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/farmerMarketplace';

const connectDB = async () => {
    try {
        await mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
