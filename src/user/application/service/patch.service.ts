/* Domain Layer */
import { UserEntity } from "src/user/domain/entities/user.entitie";

import { Id } from "src/utils/interface/id/abstract.id";

import { UserUpdateRepository }  from "src/user/domain/interface/repository";
import { USER_UPDATE_REPOSITORY } from "src/user/domain/interface/repository.token";

import { EncryptStrategy } from "src/utils/interface/crypto/encrypt";
import { ENCRYPT_TOKEN } from "src/utils/interface/crypto/encrypt.token";


/* Extenal */
import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";

/* Services layer */
import { GetUserService } from "./get.service";

/* DTOS */
import { 
    PatchUserActiveDTO,
    PatchUserNameDTO,
    PatchUserScopesDTO } from "src/user/application/dtos/patch.dto";
import { GetUserIdDTO } from "src/user/application/dtos/get.dto";
import { PatchPasswordDTO } from "src/user/application/dtos/password.dto";
import { UseCaseException } from "../errors/usecase.exception";
import { UseCaseErrorType } from "../errors/usecase.exeception.enum";
import { Name } from "src/user/domain/domain-types/Name";
import { Scope } from "src/user/domain/domain-types/Scope";
import { UserDTO } from "src/user/domain/dtos/user.entity.dto";
import { Password } from "src/user/domain/domain-types/Password";

@Injectable()
export class PatchUserService 
{
    constructor(
        private readonly userGetService: GetUserService,
        @Inject(USER_UPDATE_REPOSITORY)
        private readonly repository: UserUpdateRepository,
        @Inject(ENCRYPT_TOKEN)
        private readonly encryptService: EncryptStrategy
    ){}

    async updateUsername(idDto: GetUserIdDTO, dto: PatchUserNameDTO): Promise<PatchUserNameDTO>
    {
        const name = new Name(dto.name);

        const result = await this.repository.updateUsername(idDto.id, name.getValue());

        if (result === null)
            throw new UseCaseException("User not found", UseCaseErrorType.NOT_FOUND)     

        return {
            name: result.name
        } as PatchUserNameDTO
    }

    async updateActive(idDto: GetUserIdDTO, dto: PatchUserActiveDTO): Promise<PatchUserActiveDTO>
    {
        const result = await this.repository.updateStatus(idDto.id, dto.active);

        if (result === null)
            throw new UseCaseException("User not found",UseCaseErrorType.NOT_FOUND)
        
        return {
            active: result.active
        } as PatchUserActiveDTO
    }

    async updateUserScopes(idDto: GetUserIdDTO, dto: PatchUserScopesDTO): Promise<PatchUserScopesDTO>
    {
        const permissionsSanization = dto.permissions?.trim()
        const scopes = dto.scopes.map(scopeStr => new Scope(scopeStr));
        const permissions = permissionsSanization ? new Scope(permissionsSanization) : null;

        const user = await this.userGetService.getUserById(idDto);

        const existingBaseScopes = new Set(
            user.scopes.map(scope => {
                const parts = scope.split(":");
                return parts.length === 2 ? parts[1] : parts[0];
            })
        );

        const newScopes = scopes.filter(scope => !existingBaseScopes.has(scope.getValue()));

        let result: UserDTO | null = null;

        if(newScopes.length > 0)
            result = await this.repository.addScopes(
                idDto.id, 
                dto.scopes);
        
        
        if(permissions)
            result = await this.repository.addScopedPermissions(
                idDto.id,
                dto.scopes,
                permissions.getValue())
        

        if (!result)
            throw new UseCaseException("No permission or scope to update", UseCaseErrorType.NOT_FOUND)
        

        return {
            scopes: result.scopes,
        } as PatchUserScopesDTO
    }

    async updateUserPassword(idDto: GetUserIdDTO, dto: PatchPasswordDTO): Promise<void> {
        const confirmPassword = new Password(dto.confirmPassword.trim())
        const newPassword = new Password(dto.newPassword.trim())
        const currentPassword = new Password(dto.currentPassword.trim())

        Password.match(confirmPassword, newPassword)

        const user = await this.userGetService.getUserById(idDto);

        if(user.password === undefined)
            throw new UseCaseException("Your auth service context doesn't have password", UseCaseErrorType.NOT_FOUND);
        
        await currentPassword.hashMatch(this.encryptService,user.password);
        const hashedPassword = await newPassword.generateHash(this.encryptService);

        await this.repository.updatePassword(idDto.id,hashedPassword);
    }
}