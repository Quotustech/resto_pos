import mongoose from "mongoose";
import { config } from "./index";

const connectDB = async () => {
    try {
        await mongoose.connect(config.DATABASE_URL!);
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

export default connectDB;