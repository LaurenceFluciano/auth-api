import { IsOptional, IsEmail, IsNotEmpty, IsString, IsArray, ArrayNotEmpty } from "class-validator"

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    projectKey: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string

    @IsOptional()
    @IsString()
    password: string

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    scopes: string[];
}
