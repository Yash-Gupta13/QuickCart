class ApiError {
  constructor(
    statusCode,
    message = "Internal Server Error!",
    data = null,
    success = false,
    error = true,
    stack = null
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = success;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
