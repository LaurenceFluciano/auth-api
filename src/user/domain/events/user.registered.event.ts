import { DomainEvent } from 'src/share/events/event.interface';

export class UserRegisteredEvent implements DomainEvent {
  public readonly occurredAt: Date;

  constructor(
    public readonly userId: Id,
    public readonly name: string,
    public readonly email: string,
    public readonly projectKey?: string,
  ) {
    this.occurredAt = new Date();
  }
}
