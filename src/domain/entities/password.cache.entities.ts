export class CacheCodeEntity {
  constructor(
    public readonly code: string,
    public readonly userId: string,
    public readonly projectKey: string
  ) {}
}