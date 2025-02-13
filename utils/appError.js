/**Inheritance,we are creating our own appError instance from the Error class */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    /**We manually set this true as we are handling errors which we know might appear */
    this.isOperational = true;

    if (Error.captureStackTrace) {
      /**For v8-specification */
      Error.captureStackTrace(this, this.constructor);
    } else {
      /**For crossplatform compatibility */
      this.stack = new Error().stack;
    }
  }
}

module.exports = AppError;
