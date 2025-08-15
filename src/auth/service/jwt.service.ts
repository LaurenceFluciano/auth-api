/* External */
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

/* AuthService */
import { AuthService } from "src/auth/service/auth.service";
import { ID_GENERATE } from "src/shared/interface/code/id.generate.token";
import { IdGenerator } from "src/shared/interface/code/id.generate";
import { JWTTokenPayload } from "../interface/jwt-payload.interface";
import { ILoginInput } from "../interface/input.user.interface";

@Injectable()
export class AuthServiceJWT {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        @Inject(ID_GENERATE)
        private readonly generatorId: IdGenerator,
    ){}

    async login(dto: ILoginInput): Promise<JWTTokenPayload> {
        const user = await this.authService.validateUser(dto);

        const accessExpireIn = this.config.get("ACCESS_TOKEN_EXPIRE_IN") || "15m";
        const refreshExpireIn = this.config.get("REFRESH_TOKEN_EXPIRE_IN") || "1h";

        const [accessTokenJti, refreshTokenJti] = await Promise.all([
            this.generatorId.generateId(),
            this.generatorId.generateId()
        ])

        const [accessToken, refreshToken] = await Promise.all(
            [
                this.jwtService.signAsync(
                    {
                        sub: user.id,
                        email: user.email,
                        projectKey: user.projectKey,
                        scopes: user.scopes,
                        name: user.name,
                        jti: accessTokenJti,
                    },
                    {
                        expiresIn: accessExpireIn
                    }),
                this.jwtService.signAsync(
                    {
                        sub: user.id,
                        jti: refreshTokenJti
                    },
                    {
                         expiresIn: refreshExpireIn
                    })
            ]
        )

        const accessTokenDecode = this.jwtService.decode(accessToken);
        const refreshTokenDecode = this.jwtService.decode(refreshToken);

        return {
            sub: user.id,
            accessToken,
            refreshToken,
            tokenType: "JWT",
            accessJti: accessTokenJti!,
            refreshJti: refreshTokenJti!,
            refreshTokenIat: refreshTokenDecode.iat,
            refreshTokenExp: refreshTokenDecode.exp,
            accessTokenIat: accessTokenDecode.iat,
            accessTokenExp: accessTokenDecode.exp
            
        };
    }

    async simpleLogin(dto: ILoginInput): Promise<Partial<JWTTokenPayload>> {
        const user = await this.authService.validateUser(dto);

        const payload = {
            sub: user.id,
            email: user.email,
            projectKey: user.projectKey,
            scopes: user.scopes,
            name: user.name,
        };

        const accessToken = await this.jwtService.signAsync(
            payload,
            {
                expiresIn: this.config.get("ACCESS_TOKEN_EXPIRE_IN") || "15m",
            }
        );

        const decode = this.jwtService.decode(accessToken);

        return {
            accessToken,
            tokenType: "JWT",
            iat: decode.iat,
            exp: decode.exp
        };
    }


    
}