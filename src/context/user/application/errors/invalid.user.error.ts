import { UseCaseException } from 'src/share/context/error/application/usecase.error';
import { InvalidValueObjectException } from 'src/share/context/error/domain/value-object.error';
import { InvalidUserException } from 'src/context/user/domain/errors/user.error';

export class InvalidUserUseCaseError extends UseCaseException {
  constructor(private entity: InvalidUserException) {
    super('Impossible to create an invalid user.');
  }

  toDto(): {
    message: string;
    fields: Record<string, Omit<InvalidValueObjectException, 'name'>>;
  } {
    const dto = {
      message: 'Invalid User.',
      fields: {} as Record<string, Omit<InvalidValueObjectException, 'name'>>,
    };

    for (const [field, voError] of Object.entries(this.entity.errors.fields)) {
      dto.fields[field] = {
        message: voError.message,
        errors: voError.errors,
      };
    }

    return dto;
  }
}
