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

class JWTLoginDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    accessToken: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    refreshToken: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    refreshJti: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    accessJti: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    accessTokenExpiresIn: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    refreshTokenExpiresIn: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    userId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    tokenType: string
}


class JWTLoginResponseDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    accessToken: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    refreshToken: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    accessTokenExpiresIn: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    refreshTokenExpiresIn: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    userId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    tokenType: string
}

class JWTSimpleLoginResponseDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    accessToken: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    accessTokenExpiresIn: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    tokenType: string
}


class RefreshTokenDto
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

export {LoginDTO,
    JWTLoginResponseDTO,
    LoginServiceDTO, 
    JWTSimpleLoginResponseDTO, 
    RefreshTokenDto,
    AccessTokenReponse,
    JWTLoginDTO}