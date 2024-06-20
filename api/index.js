import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser"

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.listen(3000, () => {
  console.log("server is running on port 3000 !!");
});

// send data as a json form
app.use(express.json());

// get the data from cookies
app.use(cookieParser());

// routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// middlewares
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
