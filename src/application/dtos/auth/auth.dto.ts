import { IsString } from "@nestjs/class-validator";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

class LoginServiceDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
    
    @IsOptional()
    @IsString()
    password: string


    @IsNotEmpty()
    @IsString()
    projectKey: string
}


class LoginDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
    
    @IsOptional()
    @IsString()
    password: string
}

class LoginResponseDTO {
    @IsNotEmpty()
    @IsString()
    accessToken: string

    @IsNotEmpty()
    @IsString()
    expiresIn: string

    @IsNotEmpty()
    @IsString()
    tokenType: string
}

export {LoginDTO,LoginResponseDTO,LoginServiceDTO}