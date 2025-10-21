export class ResponseUserDto {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly projectKey: string,
    public readonly scopes: string[],
    public readonly id: Id,
  ) {}
}
