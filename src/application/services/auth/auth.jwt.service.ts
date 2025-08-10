/* External */
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


/* DTOs */
import { LoginServiceDTO, JWTLoginDTO, JWTSimpleLoginResponseDTO } from "src/application/dtos/auth/auth.dto";

/* AuthService */
import { AuthService } from "src/application/services/auth/auth.service";
import { ID_GENERATE } from "src/domain/ports/code/id.generate.token";
import { IdGenerator } from "src/domain/ports/code/id.generate";

@Injectable()
export class AuthServiceJWT {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        @Inject(ID_GENERATE)
        private readonly generatorId: IdGenerator,
    ){}

    async login(dto: LoginServiceDTO): Promise<JWTLoginDTO> {
        const user = await this.authService.validateUser(dto);

        const accessTokenJti: string = this.generatorId.generateId();
        const refreshTokenJti: string = this.generatorId.generateId();

        const payload = {
            sub: user.id,
            email: user.email,
            projectKey: user.projectKey,
            scopes: user.scopes,
            name: user.name,
            jti: accessTokenJti
        };

        const accessToken = await this.jwtService.signAsync(
            payload,
            
            {
                expiresIn: this.config.get("ACCESS_TOKEN_EXPIRE_IN") || "15m",
            }
        );
        const refreshToken = await this.jwtService.signAsync(
            {
                sub: user.id,
                jti: refreshTokenJti
            },
            {
                expiresIn: this.config.get("REFRESH_TOKEN_EXPIRE_IN") || "1h",
            }
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

    async simpleLogin(dto: LoginServiceDTO): Promise<JWTSimpleLoginResponseDTO> {
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