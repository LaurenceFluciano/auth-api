/* EXTERN */
import { Inject, NotFoundException } from '@nestjs/common';

/* Domain Layer */
import { ID, UserGetterRepsitory } from 'src/domain/interface/user.repository';
import { USER_GETTER_REPOSITORY } from 'src/domain/interface/user.repository.ports';
import { USER_ID_VALIDATION } from 'src/domain/interface/validations.ports';
import { UserEntity } from 'src/domain/entities/user.entities';

/* DTOS */
import { GetUserIdDTO } from '../dtos/users/get.user.dto';
import { IdValidator } from 'src/domain/interface/validation.interface';
import { GetUserResponseDTO } from '../dtos/users/response.user.dto';

export class GetUserService {
    constructor(
        @Inject(USER_GETTER_REPOSITORY)
        private readonly repository: UserGetterRepsitory,
        @Inject(USER_ID_VALIDATION) 
        private readonly externalValidation: IdValidator,
    ){}
    
    async GetUserById(dto: GetUserIdDTO): Promise<GetUserResponseDTO>
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
}
