export interface SimpleMapper<T,E> {
    toDomain(external: E, options?: {} ): T,
    toPersistence(entity: T, options?: {} ): E
}

export interface FilteredMapper<T,E> {
    toPartialDomain(external: Partial<E>, options?: {} ): Partial<T>,
    toPartialPersistence(entity: Partial<T>, options?: {} ): Partial<E>
}