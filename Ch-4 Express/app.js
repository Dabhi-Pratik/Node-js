import express from "express";

const app = express();

app.get("/",(req,res)=>{
  res.json("Hello from Server.......!");
})

app.get("/about",(req,res)=>{
    res.json("This is About Page......!")
})

const port = 5000;

app.listen(port,()=>{
    console.log("Server Running from Port",port)
})