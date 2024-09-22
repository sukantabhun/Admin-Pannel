import mongoose from "mongoose";

const url = 'mongodb+srv://sukantabhun:a466kalkaji@cluster0.9ijnc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    try {
        await mongoose.connect(url);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    }
};

export default connectDB;
