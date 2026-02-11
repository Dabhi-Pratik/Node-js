import express from "express"
import connectDB from "./db/mongoose.js";
import HttpError from "./midware/Httperror.js";

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json("Hello from Server")
})

//Undefine Routes

app.use((req, res, next) => {
    next(new HttpError("Request routes not found...!",404))
})

//centralised Error

app.use((error, req, res, next) => {

    if (res.headersSent) {
     next(error)
    }
    res.status(error.statusCode || 5000).json({ message: error.message || "internal Server Error" });
})

async function startServer(){
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`server Running on port ${port}`)
        })

    } catch (error) {
       console.log(error.message)
       process.exit(1)
    }
}

startServer()





