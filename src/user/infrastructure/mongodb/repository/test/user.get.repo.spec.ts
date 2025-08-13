import { GetUserMongoDBRepository } from "../getter.repository";
import { CreateUserMongoDBRepository } from "../create.repository";
import { simpleUserFactory } from "./user.test.kit";
/*
 * O módulo abaixo contem de forma organizada os imports, 
 * para evitar um monte de imports nos testes
 */
import * as testKit from "./user.repo.basic.test.kit";

describe("[MongoDB Test] : [Unitary Test] GetUserRepository",() => {
    let userCreateRepository: testKit.UserCreatorRepository;
    let userGetRepository: testKit.UserGetterRepsitory;
    let connection: typeof testKit.mongoose;
    let mongoServer: testKit.MongoMemoryServer;
    let mongo: any;
    let createdEntity: Partial<testKit.UserEntity<testKit.ID>>; 
    let nextEntity: number;
    let userId: string;

    beforeAll(async () => {
        jest.setTimeout(30000); 
        mongo = await testKit.initMongoMemory();
        connection = mongo.connection;
        mongoServer = mongo.mongoServer;
        userCreateRepository = new CreateUserMongoDBRepository(mongo.userModel);
        userGetRepository = new GetUserMongoDBRepository(mongo.userModel);

        // Create User to test
        [createdEntity, nextEntity] = simpleUserFactory();
        userId = await userCreateRepository.create(createdEntity as testKit.UserEntity<testKit.ID>);
    })

    afterAll(async () => {
        await connection.disconnect();
        await mongoServer.stop()
    })


    it("It should get username by id.", async () => {
        const result = await userGetRepository.getUserById(userId);

        expect(result?.email).toBe(createdEntity.email);
        expect(result?.projectKey).toBe(createdEntity.projectKey);
        expect(result?.name).toBe(createdEntity.name);
        expect(result?.active).toBe(createdEntity.active);
        expect(result?.scopes).toEqual(createdEntity.scopes);
    })

    it("It should get user by credentials.", async () => {
        const result = await userGetRepository.getUserByCredential(
            createdEntity.email as string, 
            createdEntity.projectKey as string);

        expect(result?.email).toBe(createdEntity.email);
        expect(result?.projectKey).toBe(createdEntity.projectKey);
        expect(result?.name).toBe(createdEntity.name);
        expect(result?.active).toBe(createdEntity.active);
        expect(result?.scopes).toEqual(createdEntity.scopes);
    })

})