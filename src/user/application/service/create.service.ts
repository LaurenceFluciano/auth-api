/* EXTERN */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

/* Domain Layer */
import { UserEntity } from 'src/user/domain/entities/user.entities';

import { UserCreatorRepository, ID } from 'src/user/infrastructure/mongodb/repository/test/user.repo.basic.test.kit';
import { USER_CREATOR_REPOSITORY } from 'src/user/domain/interface/repository.token';

import { UserValidation } from 'src/user/domain/validation/validation';
import { USER_VALIDATION } from 'src/user/domain/validation/validations.token';        

import { ENCRYPT_TOKEN } from "src/shared/interface/crypto/encrypt.token";
import { EncryptStrategy } from "src/shared/interface/crypto/encrypt";

/* DTOS */
import { CreateUserDTO } from 'src/user/dto/create.dto';
import { GetUserIdDTO } from 'src/user/dto/get.dto';

@Injectable()
export class CreateUserService {

  constructor(
    @Inject(USER_CREATOR_REPOSITORY)
    private readonly repository: UserCreatorRepository,
    @Inject(ENCRYPT_TOKEN)
    private readonly encryptService: EncryptStrategy,
    @Inject(USER_VALIDATION)
     private userValidation: UserValidation
  ){}
  
  async create(dto: CreateUserDTO): Promise<GetUserIdDTO>
  {
    dto.scopes.forEach(scope => {
      if(!this.userValidation.isValidScopes(scope))
        throw new BadRequestException("Invalid scope format.");
      
    })

    if(!this.userValidation.isValidEmail(dto.email))
        throw new BadRequestException("Invalid email.");
    
    if(!this.userValidation.isValidProjectKey(dto.projectKey))
      throw new BadRequestException("Invalid projectKey.");

    if(!this.userValidation.isValidUsername(dto.name))
      throw new BadRequestException("Invalid username.");

    const user: UserEntity<ID> = {
      name: dto.name,
      email: dto.email,
      projectKey: dto.projectKey,
      scopes: dto.scopes,
      active: true,
    }

    if(dto?.password) 
    {
      if(!this.userValidation.isValidPassword(dto.password))
      {
        throw new BadRequestException("Invalid input");
      }

      const encryptPassword = await this.encryptService.hash(dto?.password);

      user.password = encryptPassword;
    }

    const result: string = await this.repository.create(user);
    return { id: result };
  }
}
