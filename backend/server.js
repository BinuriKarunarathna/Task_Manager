import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/tasks", taskRoutes);

const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_NAME } = process.env;

// ✅ Top-level await for MongoDB connection
try {
  await mongoose.connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`
  );
  console.log("MongoDB connected");
} catch (err) {
  console.error("MongoDB connection failed:", err);
  process.exit(1); // Exit if DB connection fails
}

// ✅ Export both app and server
let server;
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  server = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
}

export { app, server };
