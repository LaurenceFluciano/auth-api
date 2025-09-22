export class UserRegisteredEvent {
  constructor(
    public readonly id: Id,
    public readonly name: string,
    public readonly email: string,
  ) {}

  public static forProject(
    projectKey: string,
    id: Id,
    name: string,
    email: string,
  ): { routingKey: string; payload: UserRegisteredEvent } {
    return {
      routingKey: `project.${projectKey}`,
      payload: new UserRegisteredEvent(id, name, email),
    };
  }
}
