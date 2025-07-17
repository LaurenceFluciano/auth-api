import { IsString } from "@nestjs/class-validator";
import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

class LoginServiceDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    password: string


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    projectKey: string
}


class LoginDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @IsEmail()
    email: string
    
    @IsOptional()
    @ApiProperty()
    @IsString()
    password: string
}

class LoginResponseDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    accessToken: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    expiresIn: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    tokenType: string
}

export {LoginDTO,LoginResponseDTO,LoginServiceDTO}