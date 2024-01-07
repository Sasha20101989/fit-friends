export class HttpError extends Error {
  public status!: number;
  public detail?: string;

  constructor(httpStatusCode: number, message: string, detail?: string) {
    super(message);

    this.status = httpStatusCode;
    this.message = message;
    this.detail = detail;
  }
}
