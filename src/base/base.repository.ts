import { TOffsetPagination } from './base.pagination';

export interface ICreateRepository<TEntity> {
  add(input: TEntity): MaybePromise<Id | null>;
}

export interface IUpdateRepository<TEntity> {
  updateById(id: Id, newField: TEntity): MaybePromise<Partial<TEntity | null>>;
}

export interface IDeleteRepository<TEntity> {
  deleteById(id: Id): MaybePromise<Partial<TEntity>>;
}

export interface IFindRepository<TEntity> {
  findById(id: Id): MaybePromise<TEntity | null>;
  findAll(pagination: TOffsetPagination): TEntity;
}
