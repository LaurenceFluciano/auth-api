export interface DomainEvent {
  readonly occurredAt: Date;
}

export interface IDomainEventsObserver {
  dispatch(event: DomainEvent): Promise<void>;
  register<T extends DomainEvent>(
    eventName: string,
    handler: (event: T) => Promise<void>
  ): Promise<void>;
}
