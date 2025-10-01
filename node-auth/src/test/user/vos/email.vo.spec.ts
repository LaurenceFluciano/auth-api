import { Email } from 'src/context/user/domain/values-objects/user/email.vo';
import { FakeValidator } from './fake.external.validator';

describe('Email Value Object', () => {
  it('Should create a valid email', () => {
    const input = 'john@example.com';

    const emailOrError = Email.create(input);

    expect(emailOrError.isRight()).toBe(true);
  });

  it('Should collect errors from external validators', () => {
    const input = 'john@example.com';

    const emailOrError = Email.create(input, new FakeValidator());

    expect(emailOrError.isLeft()).toBe(true);
    if (emailOrError.isLeft()) {
      expect(emailOrError.value.errors.length).toBe(1);
      expect(emailOrError.value.errors[0].type).toBe('Fake');
    }
  });
});
