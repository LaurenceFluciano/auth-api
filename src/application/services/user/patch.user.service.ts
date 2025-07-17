/* Domain Layer */
import { USER_UPDATE_REPOSITORY } from "src/domain/ports/repositories/user.repository.ports";
import { UserUpdateRepository } from 'src/infrastructure/mongodb/repository/test/user.repo.basic.test.kit';

/* Extenal */
import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";

/* Services layer */
import { GetUserService } from "./get.user.service";

/* DTOS */
import { 
    PatchUserActiveDTO,
    PatchUserNameDTO,
    PatchUserScopesDTO } from "../../dtos/users/patch.user.dto";
import { GetUserIdDTO } from "../../dtos/users/get.user.dto";
import { PatchPasswordDTO } from "src/application/dtos/users/user.password.dto";
import { EncryptService } from "src/infrastructure/utils/crypto.abstract";
import { USER_VALIDATION } from "src/domain/ports/validations.ports";
import { AbstractUserExternalValidation } from "src/domain/ports/validation.interface";

@Injectable()
export class PatchUserService 
{
    constructor(
        private readonly userGetService: GetUserService,
        @Inject(USER_UPDATE_REPOSITORY)
        private readonly repository: UserUpdateRepository,
        @Inject(EncryptService)
        private readonly encryptService: EncryptService,
        @Inject(USER_VALIDATION)
        private readonly userValidation: AbstractUserExternalValidation
    ){}

    async updateUsername(idDto: GetUserIdDTO, dto: PatchUserNameDTO): Promise<PatchUserNameDTO>
    {
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

        const result = await this.repository.updateScopes(idDto.id, dto.scopes);

        if (result === null)
        {
            throw new NotFoundException("User not found")
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