export interface IConnectionDatabase {
  connect(): Promise<void> | void;
  disconnect(): Promise<void> | void;
}
