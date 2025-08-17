import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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
    userId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    tokenType: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Issued at timestamp (seconds)' })
    @ApiResponseProperty()
    iat: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Expiration timestamp (seconds)' })
    @ApiResponseProperty()
    exp: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Issued at timestamp (seconds)' })
    @ApiResponseProperty()
    refreshTokenIat?: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Expiration timestamp (seconds)' })
    @ApiResponseProperty()
    refreshTokenExp?: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Issued at timestamp (seconds)' })
    @ApiResponseProperty()
    accessTokenIat?: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Expiration timestamp (seconds)' })
    @ApiResponseProperty()
    accessTokenExp?: number;
}

import { IRefreshTokenRequest, IAccessTokenReponse } from "../interface/jwt-token.interface";

class RefreshTokenRequest implements IRefreshTokenRequest
{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @ApiResponseProperty()
    refreshToken: string
}

class AccessTokenReponse implements IAccessTokenReponse
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

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Issued at timestamp (seconds)' })
    @ApiResponseProperty()
    iat: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Expiration timestamp (seconds)' })
    @ApiResponseProperty()
    exp: number;

}

export {
    JWTResponse,
    RefreshTokenRequest,
    AccessTokenReponse
}