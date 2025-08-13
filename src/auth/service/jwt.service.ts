/* External */
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

/* DTOs */
import { LoginServiceDTO } from "src/auth/dto/auth.dto";
import { JWTResponse, JWTSimpleLoginResponse } from "src/auth/dto/jwt.dto";

/* AuthService */
import { AuthService } from "src/auth/service/auth.service";
import { ID_GENERATE } from "src/shared/interface/code/id.generate.token";
import { IdGenerator } from "src/shared/interface/code/id.generate";

@Injectable()
export class AuthServiceJWT {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        @Inject(ID_GENERATE)
        private readonly generatorId: IdGenerator,
    ){}

    async login(dto: LoginServiceDTO): Promise<JWTResponse> {
        const user = await this.authService.validateUser(dto);

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
                        expiresIn: this.config.get("ACCESS_TOKEN_EXPIRE_IN") || "15m"
                    }),
                this.jwtService.signAsync(
                    {
                        sub: user.id,
                        jti: refreshTokenJti
                    },
                    {
                         expiresIn: this.config.get("REFRESH_TOKEN_EXPIRE_IN") || "1h",
                    })
            ]
        )

        return {
            userId: user.id,
            accessToken,
            refreshToken,
            tokenType: "JWT",
            accessJti: accessTokenJti,
            refreshJti: refreshTokenJti,
            accessTokenExpiresIn: this.config.get('ACCESS_TOKEN_EXPIRE_IN') || '15m',
            refreshTokenExpiresIn: this.config.get('REFRESH_TOKEN_EXPIRE_IN') || '1h'
        };
    }

    async simpleLogin(dto: LoginServiceDTO): Promise<JWTSimpleLoginResponse> {
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

        return {
            accessToken,
            tokenType: "JWT",
            accessTokenExpiresIn: this.config.get('ACCESS_TOKEN_EXPIRE_IN') || '15m',
        };
    }


    
}