import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config();   // Always at top

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

console.log("PORT:", process.env.PORT);

app.get("/", (req, res) => {
  res.status(200).json("Hello from Server....!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});