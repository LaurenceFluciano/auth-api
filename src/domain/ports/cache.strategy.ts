export interface CacheStrategyService<Input, Output> {
  set(key: string, data: Input): boolean;
  get(key: string): Output | undefined;
}

export const CACHE_SERVICE = "CACHE_SERVICE";