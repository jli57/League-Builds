class HttpError extends URIError {
    constructor(message, statusCode) {
        super(message);
        
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (URIError.captureStackTrace) {
            URIError.captureStackTrace(this, CustomError);
        }

        this.statusCode = statusCode;
    }    
}

module.exports = HttpError;