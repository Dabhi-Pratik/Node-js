import Http from "http"

class HttpError extends Error{
    constructor(message,statusCode = 5000){
        super(message)
        this.statusCode = statusCode;
    }
}

export default HttpError;