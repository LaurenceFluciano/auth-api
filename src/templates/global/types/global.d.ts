export {};

declare global {
  type Id = string | number;
  type MaybePromise<T> = T | Promise<T>;
  type PrimitiveType = string | number;
}
