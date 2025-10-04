import { DomainException } from 'src/templates/context/error/domain/domain.error';
import { User } from 'src/context/user-auth/domain/entities/user';
import { InvalidUserException } from 'src/context/user-auth/domain/errors/user.error';

describe('User Entity', () => {
  it('should create a valid user with all fields', () => {
    const userInput = {
      name: 'Laurence',
      email: 'laurence@example.com',
      projectKey: 'PROJECT123',
      scopes: ['read', 'write'],
    };

    const result = User.create(userInput);

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      const user = result.value;
      expect(user.getName()).toBe(userInput.name);
      expect(user.getEmail()).toBe(userInput.email);
      expect(user.getScopes()).toEqual(userInput.scopes);
    }
  });

  it('should fail if the name is not defined', () => {
    const userInput = {
      name: '',
      email: 'laurence@example.com',
    };

    const result = User.create(userInput);

    expect(result.isLeft()).toBe(true);

    if (result.isLeft()) {
      const error = result.value;
      expect(error).toBeInstanceOf(DomainException);
      expect(error).toBeInstanceOf(InvalidUserException);
      expect(error.errors.fields.length).toBeGreaterThan(0);
    }
  });

  it('should fail if the email is no defined', () => {
    const userInput = {
      name: 'Laurence',
      email: '',
    };

    const result = User.create(userInput);

    expect(result.isLeft()).toBe(true);

    if (result.isLeft()) {
      const error = result.value;
      expect(error).toBeInstanceOf(DomainException);
      expect(error).toBeInstanceOf(InvalidUserException);
      expect(error.errors.fields.length).toBeGreaterThan(0);
    }
  });

  it('should fail if the email and name is no defined', () => {
    const userInput = {
      name: '',
      email: '',
    };

    const result = User.create(userInput);

    expect(result.isLeft()).toBe(true);

    if (result.isLeft()) {
      const error = result.value;
      expect(error).toBeInstanceOf(DomainException);
      expect(error).toBeInstanceOf(InvalidUserException);
      expect(error.errors.fields.length).toBeGreaterThan(0);
    }
  });

  it('should allow creating a user without optional fields', () => {
    const userInput = {
      name: 'Laurence',
      email: 'laurence@example.com',
    };

    const result = User.create(userInput);

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      const user = result.value;
      expect(user.getScopes()).toEqual([]);
    }
  });
});
