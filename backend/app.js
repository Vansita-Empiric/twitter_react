import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./.env",
});
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Vite development server
  })
);

app.use(express.json());
app.use(cookieParser());

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8008, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed \n", err);
  });

app.use("/users", userRouter);
app.use("/posts", postRouter);
