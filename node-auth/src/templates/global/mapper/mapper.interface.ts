export interface IMapper<TEntity, TSchema> {
  toPersistence(schema: TSchema): TEntity;
  toSchema(entity: TEntity): TSchema;
}
