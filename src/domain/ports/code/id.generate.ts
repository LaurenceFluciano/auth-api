export interface IdGenerator
{
    generateId<T>(chooser?: T): string
}