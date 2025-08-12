import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

class JWTResponse {
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


class JWTLoginResponse {
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

class JWTSimpleLoginResponse {
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

export {
    JWTResponse,
    JWTLoginResponse,
    JWTSimpleLoginResponse,
}