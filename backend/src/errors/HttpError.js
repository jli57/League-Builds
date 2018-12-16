class HttpError extends Error {
    constructor(statusCode, ...params) {
        super(...params);
        
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }

        this.statusCode = statusCode;
    }    
}

module.exports = HttpError;