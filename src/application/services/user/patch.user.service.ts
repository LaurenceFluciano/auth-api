/* Domain Layer */
import { USER_UPDATE_REPOSITORY } from "src/domain/ports/repositories/user.repository.ports";
import { UserUpdateRepository } from 'src/infrastructure/mongodb/repository/test/user.repo.basic.test.kit';

/* Extenal */
import { Inject, Injectable, NotFoundException } from "@nestjs/common";


/* DTOS */
import { 
    PatchUserActiveDTO,
    PatchUserNameDTO,
    PatchUserScopesDTO } from "../../dtos/users/patch.user.dto";
import { GetUserIdDTO } from "../../dtos/users/get.user.dto";

@Injectable()
export class PatchUserService 
{
    constructor(
        @Inject(USER_UPDATE_REPOSITORY)
        private readonly repository: UserUpdateRepository
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

    async updatePatchUserScopes(idDto: GetUserIdDTO, dto: PatchUserScopesDTO): Promise<PatchUserScopesDTO>
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
}