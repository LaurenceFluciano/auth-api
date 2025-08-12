import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

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

class RefreshTokenRequest
{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    refreshToken: string
}

class AccessTokenReponse
{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    accessToken: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    userId: string
}

export {
    LoginDTO,
    LoginServiceDTO, 
    RefreshTokenRequest,
    AccessTokenReponse,
}