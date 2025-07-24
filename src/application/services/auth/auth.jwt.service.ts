/* External */
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

/* DTOs */
import { LoginServiceDTO, LoginResponseDTO } from "src/application/dtos/auth/auth.dto";

/* AuthService */
import { AuthService } from "src/application/services/auth/auth.service";

@Injectable()
export class AuthServiceJWT {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
    ){}

    async login(dto: LoginServiceDTO): Promise<LoginResponseDTO> {
        const user = await this.authService.validateUser(dto);

        const payload = {
            sub: user.id,
            email: user.email,
            projectKey: user.projectKey,
            scopes: user.scopes,
            name: user.name
        };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken,
            tokenType: "JWT",
            expiresIn: this.config.get('JWT_EXPIRES_IN') || '1h'
        };
    }
}