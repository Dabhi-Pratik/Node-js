// Import http module (not really needed here, but ok)
import Http from "http"

// Create custom error class
class HttpError extends Error {

    // Constructor runs when new error is created
    constructor(message, statuscode = 500) {

        // Call parent Error class constructor
        super(message)

        // Save status code (like 404, 500, etc.)
        this.statuscode = statuscode;
    }
}

// Export this class
export default HttpError;