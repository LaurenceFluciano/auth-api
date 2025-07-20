/* EXTERN */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

/* Domain Layer */
import { UserGetterRepsitory } from 'src/infrastructure/mongodb/repository/test/user.repo.basic.test.kit';
import { USER_GETTER_REPOSITORY } from 'src/domain/ports/repositories/user.repository.ports';
import { ID_VALIDATION } from 'src/domain/ports/validations.ports';
import { AbstractUserExternalValidation } from 'src/domain/ports/validation.interface';
import { USER_VALIDATION } from 'src/domain/ports/validations.ports';        

/* DTOS */
import { GetByCredentialsDTO, GetUserIdDTO } from '../../dtos/users/get.user.dto';
import { IdValidator } from 'src/domain/ports/validation.interface';
import { GetUserResponseDTO } from '../../dtos/users/response.user.dto';

@Injectable()
export class GetUserService {
    constructor(
        @Inject(USER_GETTER_REPOSITORY)
        private readonly repository: UserGetterRepsitory,
        @Inject(ID_VALIDATION) 
        private readonly externalValidation: IdValidator,
        @Inject(USER_VALIDATION)
        private readonly userValidation: AbstractUserExternalValidation
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

    async getUserByCredentials(dto: GetByCredentialsDTO): Promise<GetUserResponseDTO>
    {
        console.log("TEST: ", dto)
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
