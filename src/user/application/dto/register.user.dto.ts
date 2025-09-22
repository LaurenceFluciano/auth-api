import { Either, Left, Right } from 'src/error/either';
import { NotDefinedFieldDtoException } from 'src/error/invalid.dto.error';

export class RegisterUserDto {
  public readonly name: string;
  public readonly email: string;
  public readonly projectKey: string;

  private constructor(name: string, email: string, projectKey: string) {
    this.name = name;
    this.email = email;
    this.projectKey = projectKey;
  }

  public static create(
    name: string,
    email: string,
    projectKey: string,
  ): Either<NotDefinedFieldDtoException, RegisterUserDto> {
    const missingFields: string[] = [];

    const normalized: Record<string, string> = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      projectKey: projectKey.trim(),
    };

    for (const [key, value] of Object.entries(normalized)) {
      if (!value || value.length === 0) missingFields.push(key);
    }

    if (missingFields.length > 0)
      return Left.create(new NotDefinedFieldDtoException(missingFields));

    return Right.create(
      new RegisterUserDto(
        normalized.name,
        normalized.email,
        normalized.projectKey,
      ),
    );
  }
}
