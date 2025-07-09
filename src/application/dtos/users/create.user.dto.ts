import { IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator"

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

    @IsNotEmpty()
    scopes: string[]
}
