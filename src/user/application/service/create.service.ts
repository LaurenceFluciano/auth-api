/* EXTERN */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

/* Domain Layer */
import { UserEntity } from 'src/user/domain/entities/user.entitie';
import { UserCreatorRepository, UserGetterRepsitory } from 'src/user/domain/interface/repository';
import { USER_CREATOR_REPOSITORY, USER_GETTER_REPOSITORY } from 'src/user/domain/interface/repository.token';   

import { ENCRYPT_TOKEN } from "src/utils/interface/crypto/encrypt.token";
import { EncryptStrategy } from "src/utils/interface/crypto/encrypt";

/* DTOS */
import { CreateUserDTO } from 'src/user/application/dtos/create.dto';
import { GetUserIdDTO } from 'src/user/application/dtos/get.dto';
import { ProjectKey } from 'src/user/domain/domain-types/ProjectKey';
import { Name } from 'src/user/domain/domain-types/Name';
import { Email } from 'src/user/domain/domain-types/Email';
import { Scope } from 'src/user/domain/domain-types/Scope';
import { Password } from 'src/user/domain/domain-types/Password';
import { UseCaseException } from '../errors/usecase.exception';
import { UseCaseErrorType } from '../errors/usecase.exeception.enum';


@Injectable()
export class CreateUserService {

  constructor(
    @Inject(USER_CREATOR_REPOSITORY)
    private readonly repository: UserCreatorRepository,
    @Inject(ENCRYPT_TOKEN)
    private readonly encryptService: EncryptStrategy,
    @Inject(USER_GETTER_REPOSITORY)
    private readonly getRepo: UserGetterRepsitory
  ){}
  
  async create(dto: CreateUserDTO): Promise<GetUserIdDTO>
  {
    const user = new UserEntity<string>(
      new ProjectKey(dto.projectKey),
      new Name(dto.name),
      new Email(dto.email),
      dto.scopes.map(s => new Scope(s)),
      true
    );

    const userExist = await this.getRepo.getUserByCredential(user.getEmail(),user.getProjectKey())

    if(userExist)
      throw new UseCaseException("User already exists", UseCaseErrorType.CONFLICT_ERROR)

    let passwordHash: string | undefined;

    if(dto.password) 
      passwordHash = await (new Password(dto.password)).generateHash(this.encryptService);

    const id = await this.repository.create({
      active: user.active,
      email: user.getEmail(),
      name: user.getUsername(),
      projectKey: user.getProjectKey(),
      scopes: user.getScopes(),
      password: passwordHash
    });

    return { id };
  }
}
