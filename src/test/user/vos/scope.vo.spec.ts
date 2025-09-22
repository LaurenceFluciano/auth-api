import { Scope } from 'src/user/domain/values-objects/scope.vo';

describe('Scope Value Object', () => {
  it("Should create a scope without ':'", () => {
    const scopeOrError = Scope.create('admin');
    expect(scopeOrError.isRight()).toBe(true);
  });

  it("Should create a scope with ':'", () => {
    const scopeOrError = Scope.create('read:user');
    expect(scopeOrError.isRight()).toBe(true);
  });

  it("Shouldn't create a scope with many ':'", () => {
    const scopeOrError = Scope.create('read:user:andmore');
    expect(scopeOrError.isLeft()).toBe(true);
  });

  it("Shouldn't create a not defined scope", () => {
    const scopeOrError = Scope.create('');
    expect(scopeOrError.isLeft()).toBe(true);
  });
});
