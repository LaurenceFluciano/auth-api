import { ArgumentOutOfRangeError } from 'rxjs';

export {};

declare global {
  type Id = string | number;
  type MaybePromise<T> = T | Promise<T>;
  class NaturalNumber {
    private value: number;
    constructor(value: number) {
      if (value < 0)
        throw new ArgumentOutOfRangeError('Invalid natural number');
      this.value = value;
    }
    public get() {
      return this.value;
    }
  }
  type PrimitiveType = string | number;
}
