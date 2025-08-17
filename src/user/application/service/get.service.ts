/* EXTERN */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

/* Domain Layer */
import { UserGetterRepsitory } from 'src/user/domain/interface/repository';
import { USER_GETTER_REPOSITORY } from 'src/user/domain/interface/repository.token';

import { IdValidator } from 'src/utils/interface/id/abstract.id';
import { ID_VALIDATION } from 'src/utils/interface/validations.tokens';
   

/* DTOS */
import { GetByCredentialsDTO, GetUserIdDTO } from 'src/user/application/dtos/get.dto';
import { GetUserResponseDTO } from 'src/user/application/dtos/response.dto';
import { Email } from 'src/user/domain/domain-types/Email';
import { ProjectKey } from 'src/user/domain/domain-types/ProjectKey';
import { UseCaseException } from '../errors/usecase.exception';
import { UseCaseErrorType } from '../errors/usecase.exeception.enum';

@Injectable()
export class GetUserService {
    constructor(
        @Inject(USER_GETTER_REPOSITORY)
        private readonly repository: UserGetterRepsitory,
        @Inject(ID_VALIDATION) 
        private readonly externalValidation: IdValidator,
    ){}
    
    async getUserById(dto: GetUserIdDTO): Promise<GetUserResponseDTO>
    {  
        if(!this.externalValidation.isValidId(dto.id))
            throw new UseCaseException("User not found", UseCaseErrorType.NOT_FOUND);

        const userEntity = await this.repository.getUserById(dto.id);
        
        if(userEntity === null)
            throw new UseCaseException("User not found", UseCaseErrorType.NOT_FOUND);
        

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
            throw new UseCaseException("User not found", UseCaseErrorType.NOT_FOUND);
        
        if(!userEntity.id)
            throw new UseCaseException("Fatal error, can't find an id for user " + userEntity.email + " in " + userEntity.projectKey + " project.")


        return {
            id: userEntity.id,
            name: userEntity.name,
            email: userEntity.email,
            active: userEntity.active,
            projectKey: userEntity.projectKey,
            scopes: userEntity.scopes,
            password: userEntity?.password
        } 
    }

    async getUserByCredentials(dto: GetByCredentialsDTO): Promise<GetUserResponseDTO>
    {
        const email = new Email(dto.email);
        const projectKey = new ProjectKey(dto.projectKey);

        const userEntity = await this.repository.getUserByCredential(email.getValue(), projectKey.getValue());

        if(userEntity === null)
            throw new UseCaseException("User not found", UseCaseErrorType.NOT_FOUND)
        
        if(!userEntity.id)
            throw new UseCaseException("Fatal error, can't find an id for user " + userEntity.email + " in " + userEntity.projectKey + " project.")

        return {
            id: userEntity.id,
            name: userEntity.name,
            email: userEntity.email,
            active: userEntity.active,
            projectKey: userEntity.projectKey,
            scopes: userEntity.scopes,
            password: userEntity?.password
        }
    }
}
