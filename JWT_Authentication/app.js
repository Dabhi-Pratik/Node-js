import dotenv from "dotenv"

dotenv.config({ path: "./.env" })

import express from "express"
import HttpError from "./middleware/HttpError.js"
import connectDB from "./config/db.js"
import router from "./router/userRouter.js"


const app = express()

app.use(express.json())

app.use("/user", router)

app.get("/",(req,res,next)=>{
    res.status(200).json("Hello from Server....!👋")
})

// undefined route handling

app.use((req,res,next)=>{
    return next(new HttpError("Request Rout not found",404))
})

// centralize error

app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error)
    }

    res.status(error.statusCode || 500).json(error.message || "Internal Server Error")
})

async function startServer(){

    try {
        await connectDB()

        const port = process.env.PORT || 5000

        app.listen(port,()=>{
            console.log(`Server Running on port ${port}`)
        })
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

startServer()