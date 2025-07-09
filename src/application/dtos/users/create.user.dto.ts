import { IsEmail, IsNotEmpty, IsString, IsArray, ArrayNotEmpty } from "@nestjs/class-validator"

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

    @IsNotEmpty()
    @IsString()
    password: string

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    scopes: string[];
}
