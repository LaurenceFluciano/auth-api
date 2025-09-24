import { DomainEvent, IDomainEventsObserver } from './event.interface';

export class InMemoryDomainEventsObserver implements IDomainEventsObserver {
  private handlers: Record<string, ((event: DomainEvent) => Promise<void>)[]> =
    {};

  async dispatch(event: DomainEvent): Promise<void> {
    const eventName = event.constructor.name;
    const handlers = this.handlers[eventName] || [];

    for (const handler of handlers) {
      await handler(event);
    }
  }
  register<T extends DomainEvent>(
    eventName: string,
    handler: (event: T) => Promise<void>,
  ): void {
    if (!this.handlers[eventName]) this.handlers[eventName] = [];
    this.handlers[eventName].push(handler);
  }
}
