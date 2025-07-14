/* External */
import { BadRequestException, Injectable, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

/* Services */
import { GetUserService } from "../user/get.user.service";

/* DTOs */
import { LoginServiceDTO, LoginResponseDTO } from "src/application/dtos/auth/auth.dto";

/* User Validation services */
import { UserValidation } from "src/domain/validations/user.validation";

/* Encrypt Services */
import { EncryptService } from "src/infrastructure/utils/crypto.abstract";

@Injectable()
export class AuthService {
    private userValidation: UserValidation = new UserValidation()

    constructor(
        private userGetService: GetUserService,
        @Inject(EncryptService)
        private readonly encryptService: EncryptService,
        private jwtService: JwtService,
        private readonly config: ConfigService,
    ){}
    
    async login(dto: LoginServiceDTO): Promise<LoginResponseDTO>
    {
        const user = await this.userGetService.getUserByCredentials(
            {
                projectKey: dto.projectKey,
                email: dto.email}
            );

        if (user.password === undefined)
        {
            throw new BadRequestException("Password not defined")
        }
        
        if(!dto.password){
            throw new BadRequestException("Password not defined")
        }

        if (!this.userValidation.isValidPassword(dto.password)){
            throw new BadRequestException("Invalid credentials")
        }

        if (!(await this.encryptService.compare(dto.password,user.password)))
        {
            throw new BadRequestException("Invalid credentials")
        }

        const payload = 
        {
            sub: user.id,
            email: user.email,
            projectKey: user.projectKey,
            scopes: user.scopes,
            name: user.name
        }

        const accessToken = await this.jwtService.signAsync(payload)
        
        return {
            accessToken: accessToken,
            tokenType: "JWT",
            expiresIn: this.config.get('JWT_EXPIRES_IN') || '1h'
        } as LoginResponseDTO

    }
}