import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import connectDB from "./config/db.js";
import HttpError from "./middleware/HttpError.js";
import UserRouter from "./router/UserRouter.js"

const app = express();

app.use(express.json());

app.use("/user",UserRouter)

app.get("/", (req, res, next) => {
  res.status(200).json("Hello from Server....!");
});

app.use((req, res, next) => {
  return next(new HttpError("Requested Route not Founded...!"));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.StatusCode || 500)
    .json(error.message || "Internal Server Error");
});

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on Port ${port}`);
    });
  } catch (error) {
    next(new HttpError(error.message));
    process.exit(1);
  }
}

startServer();
