/* External */
import { BadRequestException, Injectable, Inject } from "@nestjs/common";

/* Services */
import { GetUserService } from "src/user/application/service/get.service";

/* DTOs */
import { LoginServiceDTO } from "src/auth/dto/auth.dto";

/* Domain */
import { UserValidation } from 'src/user/domain/validation/validation';
import { USER_VALIDATION } from 'src/user/domain/validation/validations.token';        

import { EncryptStrategy } from "src/shared/interface/crypto/encrypt";
import { ENCRYPT_TOKEN } from "src/shared/interface/crypto/encrypt.token";

@Injectable()
export class AuthService {

    constructor(
        private readonly userGetService: GetUserService,
        @Inject(ENCRYPT_TOKEN)
        private readonly encryptService: EncryptStrategy,
        @Inject(USER_VALIDATION)
        private userValidation: UserValidation
    ){}

    async validateUser(dto: LoginServiceDTO) {
        const user = await this.userGetService.getUserByCredentials({
            projectKey: dto.projectKey,
            email: dto.email
        });

        if (!dto.password || user.password === undefined) {
            throw new BadRequestException("Password not defined");
        }

        if (!this.userValidation.isValidPassword(dto.password)) {
            throw new BadRequestException("Invalid credentials");
        }

        const passwordMatches = await this.encryptService.compare(dto.password, user.password);
        if (!passwordMatches) {
            throw new BadRequestException("Invalid credentials");
        }

        return user;
    }
}