export interface CacheStrategyService<Input, Output> {
  set(key: string, data: Input): boolean;
  get(key: string): Output | undefined;
  del(key: string[]): boolean;
}

export const CACHE_SERVICE = "CACHE_SERVICE";