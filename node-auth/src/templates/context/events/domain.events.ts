import { StaticConfigEnv } from 'src/templates/config/environment.config';
import { DomainEvent, IDomainEventsObserver } from './event.interface';
import { InMemoryDomainEventsObserver } from './event.observer';
// import { ExternalBusDomainEventsObserver } from "./event.external.observer";

export class DomainEventsFactory extends StaticConfigEnv {
  public static create(): IDomainEventsObserver {
    const context = this.getEnvironmentConfig().getEnv('DOMAIN_EVENT_CONTEXT');

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

export class DomainEvents {
  private static domainEvents: IDomainEventsObserver;

  public static getInstance() {
    if (!DomainEvents.domainEvents) {
      DomainEvents.domainEvents = DomainEventsFactory.create();
    }
    return DomainEvents.domainEvents;
  }

  public static async dispatch(event: DomainEvent): Promise<void> {
    await DomainEvents.getInstance().dispatch(event);
  }
  public static async register<T extends DomainEvent>(
    eventName: string,
    handler: (event: T) => Promise<void>,
  ): Promise<void> {
    await DomainEvents.getInstance().register(eventName, handler);
  }
}
