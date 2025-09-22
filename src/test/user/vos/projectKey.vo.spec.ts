import { ProjectKey } from 'src/user/domain/values-objects/projectkey.vo';

describe('ProjectKey Value Object', () => {
  it('Should create a projectKey', () => {
    const projectKeyOrError = ProjectKey.create('Blog');
    expect(projectKeyOrError.isRight()).toBe(true);
  });

  it("Shouldn't create a invalid projectKey", () => {
    const projectKeyOrError = ProjectKey.create('ad');
    expect(projectKeyOrError.isLeft()).toBe(true);
  });

  it("Shouldn't create a not defined projectKey", () => {
    const projectKeyOrError = ProjectKey.create('');
    expect(projectKeyOrError.isLeft()).toBe(true);
  });
});
