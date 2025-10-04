import { DomainEvent, IDomainEventsObserver } from './event.interface';
import { InMemoryDomainEventsObserver } from './event.observer';
// import { ExternalBusDomainEventsObserver } from "./event.external.observer";

export class DomainEventsFactory {
  public static create(): IDomainEventsObserver {
    const context = process.env.EVENT_CONTEXT || 'monolitic';

    switch (context.toLowerCase()) {
      case 'monolitic':
        return new InMemoryDomainEventsObserver();
      case 'microservice':
        throw new Error('Microservice observer não implementado ainda');
      default:
        return new InMemoryDomainEventsObserver();
    }
  }
}
const domainEvents = DomainEventsFactory.create();

export class DomainEvents {
  public static async dispatch(event: DomainEvent): Promise<void> {
    await domainEvents.dispatch(event);
  }
  public static async register<T extends DomainEvent>(
    eventName: string,
    handler: (event: T) => Promise<void>,
  ): Promise<void> {
    await domainEvents.register(eventName, handler);
  }
}
