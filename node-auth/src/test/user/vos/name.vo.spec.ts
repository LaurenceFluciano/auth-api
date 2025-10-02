import { Name } from 'src/context/user/domain/values-objects/name.vo';

describe('Name Value Object', () => {
  it('Should create a name', () => {
    const nameOrError = Name.create('John');
    expect(nameOrError.isRight()).toBe(true);
  });

  it("Shouldn't create a invalid name", () => {
    const nameOrError = Name.create('ad');
    expect(nameOrError.isLeft()).toBe(true);
  });

  it("Shouldn't create a not defined name", () => {
    const nameOrError = Name.create('');
    expect(nameOrError.isLeft()).toBe(true);
  });
});
