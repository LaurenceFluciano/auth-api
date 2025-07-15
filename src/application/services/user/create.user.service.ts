/* EXTERN */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

/* Domain Layer */
import { UserCreatorRepository, ID } from 'src/infrastructure/mongodb/repository/test/user.repo.basic.test.kit';
import { USER_CREATOR_REPOSITORY } from 'src/domain/ports/repositories/user.repository.ports';
import { UserEntity } from 'src/domain/entities/user.entities';
import { UserValidation } from 'src/domain/validations/user.validation';

/* DTOS */
import { CreateUserDTO } from '../../dtos/users/create.user.dto';
import { GetUserIdDTO } from '../../dtos/users/get.user.dto';
import { EncryptService } from 'src/infrastructure/utils/crypto.abstract';

@Injectable()
export class CreateUserService {
  private userValidation: UserValidation = new UserValidation()

  constructor(
    @Inject(USER_CREATOR_REPOSITORY)
    private readonly repository: UserCreatorRepository,
    @Inject(EncryptService)
    private readonly encryptService: EncryptService,
  ){}
  
  async create(dto: CreateUserDTO): Promise<GetUserIdDTO>
  {
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
