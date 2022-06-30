export class DatasetFetchError extends Error {
  constructor(message = "Unhandled fetch error") {
    super();
    this.message = message;
  }
}
