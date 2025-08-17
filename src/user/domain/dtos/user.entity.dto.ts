import { Id } from "src/utils/interface/id/abstract.id";

export interface UserDTO {
    projectKey: string;
    name: string;
    email: string;
    scopes: string[];
    active: boolean;
    id?: Id, 
    password?: string,
    createdAt?: Date,
    updatedAt?: Date
}