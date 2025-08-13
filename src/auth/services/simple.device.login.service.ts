/* External */
import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

/* DTOs */
import { LoginServiceDTO, AccessTokenReponse, RefreshTokenRequest } from "src/auth/dto/auth.dto";

/* AuthService */
import { AuthServiceJWT } from "./auth.jwt.service";
import { CACHE_AUTH_TOKEN } from "src/cache/interface/cache.token";
import { CacheStrategyService } from "src/cache/interface/cache.strategy";
import { SimpleDevice } from "src/auth/domain/auth.entities";
import { JwtService } from "@nestjs/jwt";
import { ID_GENERATE } from "src/shared/interfaces/code/id.generate.token";
import { IdGenerator } from "src/shared/interfaces/code/id.generate";
import { ConfigService } from "@nestjs/config";
import { GetUserService } from "src/user/application/services/get.user.service"
import { GetUserIdDTO } from "src/user/dto/get.user.dto";
import { JWTLoginResponse } from "src/auth/dto/jwt.dto";


@Injectable()
export class SimpleDeviceAuthJWT {
    constructor(
        private readonly authService: AuthServiceJWT,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        @Inject(CACHE_AUTH_TOKEN)
        private readonly cache: CacheStrategyService<SimpleDevice, SimpleDevice>,
        @Inject(ID_GENERATE)
        private readonly generatorId: IdGenerator,
        private readonly userGetService: GetUserService,
    ){}

    async login(dto: LoginServiceDTO, deviceDtoId: string): Promise<JWTLoginResponse> {
        const result = await this.authService.login(dto);

        const cached: SimpleDevice = {
            [deviceDtoId]: {
                accessJti: result.accessJti,
                refreshJti: result.refreshJti,
            }
        };
        await this.cache.set(result.userId, cached);

        return result
    }

    async generateAccessToken(refreshTokenDto: RefreshTokenRequest, deviceDto: string): Promise<AccessTokenReponse>
    {
        try {
            const result = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken);

            const userCache = await this.cache.get(result.sub);
            if (!userCache) throw new NotFoundException("User not found.");
            if (!userCache[deviceDto]) throw new NotFoundException("Invalid token or device.");
            if (userCache[deviceDto].refreshJti !== result.jti) 
                throw new BadRequestException("Invalid refresh token");

            const accessTokenJti = await this.generatorId.generateId();

            const userDb = await this.userGetService.getUserByIdWithoutValidation({ id: result.sub } as GetUserIdDTO);

            const accessToken = await this.jwtService.signAsync(
                {
                    sub: userDb.id,
                    email: userDb.email,
                    projectKey: userDb.projectKey,
                    scopes: userDb.scopes,
                    name: userDb.name,
                    jti: accessTokenJti,
                },
                {
                    expiresIn: this.config.get("ACCESS_TOKEN_EXPIRE_IN") || "15m",
                }
            );

            userCache[deviceDto].accessJti = accessTokenJti;

            await this.cache.set(userDb.id, userCache);

            return {
                accessToken,
                userId: userDb.id,
            };
        } catch (err) {
            if (err instanceof BadRequestException || err instanceof NotFoundException) throw err;
            throw new BadRequestException("Expired or invalid refresh token");
        }
    }
}