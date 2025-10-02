export interface IMapper<D, M> {
  toDomain(schema: M): D;
  toModel(entity: D): M;
}
