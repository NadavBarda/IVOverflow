import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }
    const db = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default dbConnection;
