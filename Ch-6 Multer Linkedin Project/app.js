// Import express framework (used to create server)
import express from "express"

// Import custom error class (for handling errors)
import HttpError from "./middleware/HttpError.js";

// Import function to connect MongoDB
import connectDB from "./db/db.js";

// Create express application
const app = express()

// Server will run on this port
const port = 5000;


// -------------------- ROUTES --------------------

// Home route → when user opens http://localhost:5000/
app.get("/", (req, res) => {
    // Send response in JSON format
    res.status(200).json("Hello from Server..!")
});


// -------------------- 404 HANDLER --------------------

// If user requests route that does NOT exist,
// this middleware will run
app.use((req, res, next) => {

    // Create custom error with message + status code
    next(new HttpError("Request Routes Not Found....", 404))
})


// -------------------- ERROR HANDLER --------------------

// This middleware handles all errors in one place
app.use((error, req, res, next) => {

    // If response already sent → pass error to default handler
    if (res.headerSent) {
        return next(error)
    }

    // Send error message to client
    res
      .status(error.statuscode || 500)  // Use given status or 500
      .json({
          message: error.message || "Internal Server Error"
      })
})


// -------------------- START SERVER --------------------

// Function to start server AFTER DB connects
async function startServer() {
    try {
        // Connect to MongoDB first
        await connectDB();

        // Start server
        app.listen(port, () => {
            console.log(`Server Running on Port ${port}`)
        })

    } catch (error) {
        // If DB connection fails → show error and stop program
        console.log(error.message)
        process.exit(1)
    }
}

// Call function to start server
startServer();