/* External */
import { BadRequestException, Injectable, Inject } from "@nestjs/common";

/* Services */
import { GetUserService } from "src/user/application/service/get.service";

import { EncryptStrategy } from "src/utils/interface/crypto/encrypt";
import { ENCRYPT_TOKEN } from "src/utils/interface/crypto/encrypt.token";
import { ILoginInput } from "../interface/input.user.interface";
import { UseCaseErrorType } from "src/user/application/errors/usecase.exeception.enum";
import { UseCaseException } from "src/user/application/errors/usecase.exception";
import { Password } from "src/user/domain/domain-types/Password";

@Injectable()
export class AuthService {

    constructor(
        private readonly userGetService: GetUserService,
        @Inject(ENCRYPT_TOKEN)
        private readonly encryptService: EncryptStrategy,
    ){}

    async validateUser(dto: ILoginInput) {
        const user = await this.userGetService.getUserByCredentials({
            projectKey: dto.projectKey,
            email: dto.email
        });

        if (!dto.password || user.password === undefined) 
            throw new UseCaseException("Password not defined", UseCaseErrorType.BAD_REQUEST_ERROR);
        
        await (new Password(dto.password)).hashMatch(this.encryptService, user.password);

        return user;
    }
}