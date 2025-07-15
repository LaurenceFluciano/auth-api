/* External */
import { BadRequestException, Injectable, Inject } from "@nestjs/common";

/* Services */
import { GetUserService } from "../user/get.user.service";

/* DTOs */
import { LoginServiceDTO } from "src/application/dtos/auth/auth.dto";

/* User Validation services */
import { UserValidation } from "src/domain/validations/user.validation";

/* Encrypt Services */
import { EncryptService } from "src/infrastructure/utils/crypto.abstract";

@Injectable()
export class AuthService {
    private userValidation = new UserValidation();

    constructor(
        private readonly userGetService: GetUserService,
        @Inject(EncryptService)
        private readonly encryptService: EncryptService,
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