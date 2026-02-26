import express from "express"
import connectDB from "./db/db.js"
import profileRoutes from "./routes/profileRoutes.js"
import HttpError from "./middleware/HttpError.js"

const app = express()

app.use(express.json())

// Serve uploaded files
app.use("/uploads", express.static("uploads"))

// Routes
app.use("/profile", profileRoutes)

// Home route
app.get("/", (req, res) => {
    res.status(200).json("Hello from Server..!")
})

// 404 handler
app.use((req, res, next) => {
    next(new HttpError("Route Not Found", 404))
})

// Error handler
app.use((error, req, res, next) => {
    if (res.headerSent) return next(error)

    res.status(error.statuscode || 500).json({
        message: error.message || "Internal Server Error"
    })
})

// Start server after DB connect
async function startServer() {
    try {
        await connectDB()
        app.listen(5000, () => {
            console.log("Server Running on Port 5000")
        })
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

startServer()