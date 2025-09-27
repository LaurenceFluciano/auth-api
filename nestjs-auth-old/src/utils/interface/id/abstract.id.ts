export type Id = string

export interface IdValidator 
{
    isValidId(id: Id): boolean
}
