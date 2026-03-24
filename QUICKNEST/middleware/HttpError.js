class HttpError extends Error {
  constructor(message, StatusCode) {
    super(message);
    this.StatusCode = StatusCode;
  }
}

export default HttpError