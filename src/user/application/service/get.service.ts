/* EXTERN */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

/* Domain Layer */
import { UserGetterRepsitory } from 'src/user/infrastructure/mongodb/repository/test/user.repo.basic.test.kit';
import { USER_GETTER_REPOSITORY } from 'src/user/domain/interface/repository.token';

import { IdValidator } from 'src/user/domain/validation/validation';
import { ID_VALIDATION } from 'src/user/domain/validation/validations.token';

import { UserValidation } from 'src/user/domain/validation/validation';
import { USER_VALIDATION } from 'src/user/domain/validation/validations.token';        

/* DTOS */
import { GetByCredentialsDTO, GetUserIdDTO } from 'src/user/dto/get.dto';
import { GetUserResponseDTO } from 'src/user/dto/response.dto';

@Injectable()
export class GetUserService {
    constructor(
        @Inject(USER_GETTER_REPOSITORY)
        private readonly repository: UserGetterRepsitory,
        @Inject(ID_VALIDATION) 
        private readonly externalValidation: IdValidator,
        @Inject(USER_VALIDATION)
        private readonly userValidation: UserValidation
    ){}
    
    async getUserById(dto: GetUserIdDTO): Promise<GetUserResponseDTO>
    {  
        if(!this.externalValidation.isValidId(dto.id))
        {
            throw new NotFoundException("User not found");
        }

        const userEntity = await this.repository.getUserById(dto.id);
        
        if(userEntity === null)
        {
            throw new NotFoundException("User not found");
        }

        return {
            id: userEntity.id,
            name: userEntity.name,
            email: userEntity.email,
            active: userEntity.active,
            projectKey: userEntity.projectKey,
            scopes: userEntity.scopes,
            password: userEntity?.password
        } as GetUserResponseDTO
    }

    async getUserByIdWithoutValidation(dto: GetUserIdDTO): Promise<GetUserResponseDTO>
    {
        const userEntity = await this.repository.getUserById(dto.id);
        
        if(userEntity === null)
        {
            throw new NotFoundException("User not found");
        }

        return {
            id: userEntity.id,
            name: userEntity.name,
            email: userEntity.email,
            active: userEntity.active,
            projectKey: userEntity.projectKey,
            scopes: userEntity.scopes,
            password: userEntity?.password
        } as GetUserResponseDTO
    }

    async getUserByCredentials(dto: GetByCredentialsDTO): Promise<GetUserResponseDTO>
    {
        if(!this.userValidation.isValidEmail(dto.email))
        {   
            console.log(dto.email)
            throw new NotFoundException("User not found");
        }

        if(!this.userValidation.isValidProjectKey(dto.projectKey))
        {
            console.log(dto.projectKey)
            throw new NotFoundException("User not found");
        }


        const userEntity = await this.repository.getUserByCredential(dto.email, dto.projectKey);

        if(userEntity === null)
        {
            console.log(userEntity)
            throw new NotFoundException("User not found");
        }

        return {
            id: userEntity.id,
            name: userEntity.name,
            email: userEntity.email,
            active: userEntity.active,
            projectKey: userEntity.projectKey,
            scopes: userEntity.scopes,
            password: userEntity?.password
        } as GetUserResponseDTO
    }
}
