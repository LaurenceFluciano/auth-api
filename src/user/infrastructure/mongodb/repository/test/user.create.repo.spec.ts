import { CreateUserMongoDBRepository } from "../user.create.repository"
import { simpleUserFactory, isUserEntityComplete } from "./user.test.kit";
/*
 * O módulo abaixo contem de forma organizada os imports, 
 * para evitar um monte de imports nos testes
 */
import * as testKit from "./user.repo.basic.test.kit";

describe("[MongoDB Test] : [Unitary Test] CreateUserRepository",() => {
    let createUserRepository: testKit.UserCreatorRepository;
    let connection: typeof testKit.mongoose;
    let mongoServer: testKit.MongoMemoryServer;
    let mongo: any;

    beforeAll(async () => {
        jest.setTimeout(30000); 
        mongo = await testKit.initMongoMemory();
        connection = mongo.connection;
        mongoServer = mongo.mongoServer;
        createUserRepository = new CreateUserMongoDBRepository(mongo.userModel);
    })

    afterAll(async () => {
        await connection.disconnect();
        await mongoServer.stop()
    })


    it("It must create a user and return the corresponding ID.", async () => {
        const [createdEntity,nextEntity] = simpleUserFactory(
            ["password", "createdAt", "updatedAt", "id"]
        );
        if (!isUserEntityComplete(createdEntity)) {
            throw new Error("Invalid entity for persistence");
        }

        const userId = await createUserRepository.create(createdEntity)

        expect(userId).toBeDefined();
        expect(typeof userId).toBe("string");

        const dbUser = await mongo.userModel.findById(userId);
        expect(dbUser?.email).toBe("test"+(nextEntity-1)+"@gmail.com")
    })
})