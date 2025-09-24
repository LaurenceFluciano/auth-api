import { IConnectionDatabase } from './connection.interface';

export class FakeConnectionDatabase implements IConnectionDatabase {
  connect(): void {
    console.log('Connected Fake with config: ');
  }
  disconnect(): void {
    console.log('Disconnected Fake');
  }
}
