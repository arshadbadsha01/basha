import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postsRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(postsRoutes);
app.use(userRoutes);
app.use(express.static("uploads")); 

const start = async () => {
  //   try {
  const connectDB = await mongoose.connect(
    "mongodb+srv://arshad:arshad123@cluster0.vv9bbwx.mongodb.net/?appName=Cluster0"
  );

  // console.log("✅ MongoDB is Connected Successfully");

  app.listen(9090, () => {
    console.log("🚀 Server is running on port 9090");
  });
  //   } catch (error) {
  // console.error("❌ MongoDB Connection Error:", error.message);
  //   }
};

start();
