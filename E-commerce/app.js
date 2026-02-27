import express from "express";
import cors from "cors"
import dotenv from "dotenv"

const app = express()

app.use(express.json())

dotenv.config({path:"./.env"})

console.log("port",process.env.PORT)

app.get("/",(req,res)=>{
    res.status(200).json("Hello from Server....!")
})