// Base application error
// Used as a standard error class for controlled API errors

export class AppError extends Error {
  public statusCode: number;

  /**
   * Creates a custom application error
   * @param message Error message to return to client
   * @param statusCode HTTP status code (default: 400)
   */
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}