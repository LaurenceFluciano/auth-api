/* External */
import { BadRequestException, Injectable, Inject } from "@nestjs/common";

/* Services */
import { GetUserService } from "src/application/services/user/get.user.service";

/* DTOs */
import { LoginServiceDTO } from "src/application/dtos/auth/auth.dto";

/* Domain */
import { UserValidation } from 'src/domain/ports/validations/validation';
import { USER_VALIDATION } from 'src/domain/ports/validations/validations.token';        

import { EncryptStrategy } from "src/domain/ports/crypto/encrypt";
import { ENCRYPT_TOKEN } from "src/domain/ports/crypto/encrypt.token";

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