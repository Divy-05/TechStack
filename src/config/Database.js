import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB => Connected (teechtrack)\n");
  } catch (error) {
    console.error("Mongo DB Connection Failed: ", error.message, "\n");
    process.exit(1);
  }
};

export default connectDB;