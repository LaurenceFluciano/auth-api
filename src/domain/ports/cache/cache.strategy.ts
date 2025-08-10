export interface CacheStrategyService<Input, Output> {
  set(key: string, data: Input, expireIn?: number): Promise<boolean>;
  get(key: string): Promise<Output | undefined>;
  del(key: string[]): Promise<boolean>;
  init(options?: any): Promise<void>;
}
