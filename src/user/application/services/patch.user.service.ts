/* Domain Layer */
import { UserEntity } from "src/user/domain/entities/user.entities";

import { UserUpdateRepository, ID }  from "src/user/domain/interfaces/user.repository";
import { USER_UPDATE_REPOSITORY } from "src/user/domain/interfaces/user.repository.token";

import { EncryptStrategy } from "src/shared/interfaces/crypto/encrypt";
import { ENCRYPT_TOKEN } from "src/shared/interfaces/crypto/encrypt.token";

import { UserValidation } from "src/user/domain/validations/validation";
import { USER_VALIDATION } from "src/user/domain/validations/validations.token";


/* Extenal */
import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";

/* Services layer */
import { GetUserService } from "./get.user.service";

/* DTOS */
import { 
    PatchUserActiveDTO,
    PatchUserNameDTO,
    PatchUserScopesDTO } from "src/user/dto/patch.user.dto";
import { GetUserIdDTO } from "src/user/dto/get.user.dto";
import { PatchPasswordDTO } from "src/user/dto/user.password.dto";

@Injectable()
export class PatchUserService 
{
    constructor(
        private readonly userGetService: GetUserService,
        @Inject(USER_UPDATE_REPOSITORY)
        private readonly repository: UserUpdateRepository,
        @Inject(ENCRYPT_TOKEN)
        private readonly encryptService: EncryptStrategy,
        @Inject(USER_VALIDATION)
        private readonly userValidation: UserValidation
    ){}

    async updateUsername(idDto: GetUserIdDTO, dto: PatchUserNameDTO): Promise<PatchUserNameDTO>
    {
        if(!this.userValidation.isValidUsername(dto.name))
        {
            throw new BadRequestException("Invalid username!")
        }

        const result = await this.repository.updateUsername(idDto.id, dto.name);

        if (result === null)
        {
            throw new NotFoundException("User not found")
        }

        return {
            name: result.name
        } as PatchUserNameDTO
    }

    async updateActive(idDto: GetUserIdDTO, dto: PatchUserActiveDTO): Promise<PatchUserActiveDTO>
    {
        if(!this.userValidation.isValidActive(dto.active))
        {
            throw new BadRequestException("The body must to be a real boolean!");
        }

        const result = await this.repository.updateStatus(idDto.id, dto.active);

        if (result === null)
        {
            throw new NotFoundException("User not found")
        }

        return {
            active: result.active
        } as PatchUserActiveDTO
    }

    async updateUserScopes(idDto: GetUserIdDTO, dto: PatchUserScopesDTO): Promise<PatchUserScopesDTO>
    {
        const trimmedPermission = dto.permissions?.trim();

        dto.scopes.forEach(scope => {
            if (!this.userValidation.isValidScopes(scope)) {
                throw new BadRequestException("Invalid scope format");
            }

            if (trimmedPermission && !this.userValidation.isValidScopes(scope + ":" + trimmedPermission)) {
                throw new BadRequestException("Invalid scope with permission");
            }
        });

        const user = await this.userGetService.getUserById(idDto);

        const existingBaseScopes = new Set(
            user.scopes.map(scope => {
                const parts = scope.split(":");
                return parts.length === 2 ? parts[1] : parts[0];
            })
        );
        console.log(existingBaseScopes)
        const newScopes = dto.scopes.filter(scope => !existingBaseScopes.has(scope));
        
        console.log(newScopes)

        let result: UserEntity<ID> | null = null;
        if(newScopes.length > 0)
        {
            result = await this.repository.addScopes(idDto.id, newScopes);
        }
        
        if(trimmedPermission.length > 0)
        {
            result = await this.repository.addScopedPermissions(idDto.id,dto.scopes,trimmedPermission)
        }

        if (result === null)
        {
            throw new NotFoundException("No permission or scope to update")
        }

        return {
            scopes: result.scopes
        } as PatchUserScopesDTO
    }

    async updateUserPassword(idDto: GetUserIdDTO, dto: PatchPasswordDTO): Promise<void> {
        if(
            dto.confirmPassword.trim() !== dto.newPassword.trim() 
            ||
            !this.userValidation.isValidPassword(dto.newPassword)
        )
        {
            throw new BadRequestException("Invalid input or password mismatch");     
        }
        
        const user = await this.userGetService.getUserById(idDto);

        if(user.password === undefined)
        {
            throw new NotFoundException("Your auth service context doesn't have password")
        }

        const isCurrentPasswordCorrect = await this.encryptService.compare(
            dto.currentPassword,
            user.password
        );

        if(!isCurrentPasswordCorrect)
        {
            throw new ForbiddenException("Current password incorrect");
        }

        const hashedPassword = await this.encryptService.hash(dto.newPassword);

        await this.repository.updatePassword(idDto.id,hashedPassword);
    }
}