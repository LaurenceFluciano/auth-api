export interface SimpleMapper<T,E> {
    toDomain(external: E, options?: {} ): T,
    toPersistence(domain: T, options?: {} ): E
}

export interface FilteredMapper<T,E> {
    toPartialDomain(external: Partial<E>, options?: {} ): Partial<T>,
    toPartialPersistence(domain: Partial<T>, options?: {} ): Partial<E>
}