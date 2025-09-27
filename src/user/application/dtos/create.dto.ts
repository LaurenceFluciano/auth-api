import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsEmail, IsNotEmpty, IsString, IsArray, ArrayNotEmpty } from "class-validator"

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    projectKey: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @ApiProperty()
    email: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    password: string

    @IsArray()
    @ArrayNotEmpty()
    @ApiProperty()
    @IsString({ each: true })
    scopes: string[];
}
