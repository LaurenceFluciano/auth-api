export interface IdGenerator
{
    generateId<T>(chooser?: T): Promise<string>
}