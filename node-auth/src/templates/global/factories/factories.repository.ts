export interface IRepositoryFactory<TRepository> {
  createRepository(): TRepository;
}
