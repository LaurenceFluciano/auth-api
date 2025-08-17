export interface JWTTokenPayload {
    sub: string;
    accessJti: string;
    refreshJti: string;
    accessToken: string;
    refreshToken: string;
    tokenType?: string;
    iat?: number;
    exp?: number;
    accessTokenIat?: number;
    accessTokenExp?: number;
    refreshTokenIat?: number;
    refreshTokenExp?: number;
}
