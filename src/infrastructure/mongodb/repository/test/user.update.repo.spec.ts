import { UpdateUserMongoDBRepository } from "../user.update.repository";
import { CreateUserMongoDBRepository } from "../user.create.repository";
import { simpleUserFactory } from "./user.test.kit";
/*
 * O módulo abaixo contem de forma organizada os imports, 
 * para evitar um monte de imports nos testes
 */
import * as testKit from "./user.repo.basic.test.kit";

describe("[MongoDB Test] : [Unitary Test] UpdateUserRepository",() => {
    let userUpdateRepository: testKit.UserUpdateRepository;
    let userCreateRepository: testKit.UserCreatorRepository;
    let connection: typeof testKit.mongoose;
    let mongoServer: testKit.MongoMemoryServer;
    let mongo: any;
    let createdEntity: Partial<testKit.UserEntity<testKit.ID>>; 
    let nextEntity: unknown;
    let userId: string;

    beforeAll(async () => {
        jest.setTimeout(30000); 
        mongo = await testKit.initMongoMemory();
        connection = mongo.connection;
        mongoServer = mongo.mongoServer;
        userUpdateRepository = new UpdateUserMongoDBRepository(mongo.userModel);
        userCreateRepository = new CreateUserMongoDBRepository(mongo.userModel);

        // Create User to test
        [createdEntity, nextEntity] = simpleUserFactory();
        userId = await userCreateRepository.create(createdEntity as testKit.UserEntity<testKit.ID>);
    })

    afterAll(async () => {
        await connection.disconnect();
        await mongoServer.stop()
    })


    it("It should update username.", async () => {
        const userEntity = await userUpdateRepository.updateUsername(userId,"john");
        expect(userEntity.name).toBe("john");
    })

    it("It should update status.", async () => {
         const userEntity = await userUpdateRepository.updateStatus(userId,false);
        expect(userEntity.active).toBe(false);
    })

    it("It should update scopes.", async () => {
        const userEntity = await userUpdateRepository.updateScopes(userId,["write","test"]);
        expect(userEntity.scopes.sort()).toEqual(["write", "test"].sort());
    })
})