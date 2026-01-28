import mongoose from "mongoose";

export const dbConnect = async () => {
    await mongoose.connect(process.env.DB_URL as string);
    console.info("MongoDB connected successfully");
};
