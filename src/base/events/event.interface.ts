export interface IEvent<Payload = unknown> {
  payload: Payload;
}

export interface IEventBus {
  publish(event: IEvent): MaybePromise<void>;
}
