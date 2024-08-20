class ApiResponse {
  constructor(
    statusCode,
    message = "Response Success",
    data = null,
    success = true,
    error = false
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = success;
    this.error = error;
  }
}

export { ApiResponse };
