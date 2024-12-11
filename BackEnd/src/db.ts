import mongoose from 'mongoose';

async function connectDB() {
    try {
        await mongoose.connect(`mongodb://localhost:27017/user-management-angular`);
        console.log('MongoDB connected');
    } catch (error) {
        if (error instanceof Error) {
            console.error('MongoDB connection error:', error.message);
        } else {
            console.error('An unknown error occurred:', error);
        }
        process.exit(1);
    }
}


export default connectDB;