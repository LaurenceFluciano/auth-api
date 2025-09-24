export class ConfigError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
