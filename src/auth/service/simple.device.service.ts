/* External */
import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { IAccessTokenReponse, IRefreshTokenRequest } from "../interface/jwt-token.interface";


/* AuthService */
import { AuthServiceJWT } from "./jwt.service";
import { CACHE_AUTH_TOKEN } from "src/cache/domain/interface/cache.token";
import { CacheStrategyService } from "src/cache/domain/interface/cache.strategy";
import { SimpleDevice } from "src/auth/domain/auth.entities";
import { JwtService } from "@nestjs/jwt";
import { ID_GENERATE } from "src/shared/interface/code/id.generate.token";
import { IdGenerator } from "src/shared/interface/code/id.generate";
import { ConfigService } from "@nestjs/config";
import { GetUserService } from "src/user/application/service/get.service"
import { GetUserIdDTO } from "src/user/dto/get.dto";
import { JWTTokenPayload } from "../interface/jwt-payload.interface";
import { ILoginInput } from "../interface/input.user.interface";


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

    async login(dto: ILoginInput, deviceDtoId: string): Promise<JWTTokenPayload> {
        const result = await this.authService.login(dto);

        const cached: SimpleDevice = {
            [deviceDtoId]: {
                accessJti: result.accessJti,
                refreshJti: result.refreshJti,
            }
        };
        await this.cache.set(result.sub, cached);

        return result
    }

    async generateAccessToken(refreshTokenDto: IRefreshTokenRequest, deviceDto: string): Promise<IAccessTokenReponse>
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

            const decode = this.jwtService.decode(accessToken)

            return {
                accessToken,
                userId: userDb.id,
                exp: decode.exp,
                iat: decode.iat
            };
        } catch (err) {
            if (err instanceof BadRequestException || err instanceof NotFoundException) throw err;
            throw new BadRequestException("Expired or invalid refresh token");
        }
    }
}