/* NestJS framework */
import { Test, TestingModule } from "@nestjs/testing"

/* Services */
import { CreateUserService } from "../user/create.user.service"

/* Domain Layer - Repository */
import { USER_CREATOR_REPOSITORY } from "src/domain/interface/user.repository.ports"
import { UserCreatorRepository } from "src/domain/interface/user.repository"

/* External services and Validations */
import { EncryptService } from "src/infrastructure/utils/crypto.abstract"

/* Excepetions */
import { BadRequestException } from "@nestjs/common"

/* DTOs */
import { CreateUserDTO } from "src/application/dtos/users/create.user.dto"

/* INCOMPLETE!!!!!!!!!!!! */

describe('[USER SERVICE] CreateUserService', () => {
    let service: CreateUserService
    let repository: UserCreatorRepository

    let encryptService: EncryptService;

    const mockRepository = {
        create: jest.fn(),
    };

    const mockEncryptService = {
        hash: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            CreateUserService,
            {
                provide: USER_CREATOR_REPOSITORY,
                useValue: mockRepository,
            },
            {
                provide: EncryptService,
                useValue: mockEncryptService,
            },
        ],
        }).compile();

        service = module.get<CreateUserService>(CreateUserService);
        repository = module.get(USER_CREATOR_REPOSITORY);
        encryptService = module.get(EncryptService);

        /*it("It should create an user", async () => {
            const user = service.create(
                {
                    email: "valid@gmail.com",
                    name: "Valid",
                    projectKey: "123",
                    scopes: ["admin"]
                } as CreateUserDTO
            )

        })*/
    });
})