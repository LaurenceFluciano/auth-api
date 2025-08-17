export interface IRefreshTokenRequest
{
    refreshToken: string;
}

export interface IAccessTokenReponse
{
    accessToken: string;
    userId: string;
    exp: number;
    iat: number;
}