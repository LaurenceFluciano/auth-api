import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { NotDefinedFieldDtoException } from 'src/templates/context/error/application/invalid.dto.error';

export class RegisterUserDto {
  public readonly name: string;
  public readonly email: string;
  public readonly projectKey: string;

  private constructor(name: string, email: string, projectKey: string) {
    this.name = name;
    this.email = email;
    this.projectKey = projectKey;
  }

  public static create(_dto: {
    name: string | undefined;
    email: string | undefined;
    projectKey: string | undefined;
  }): Either<NotDefinedFieldDtoException, RegisterUserDto> {
    const missingFields: string[] = [];

    const normalized: Record<string, string> = {
      name: (_dto.name ?? '').trim(),
      email: (_dto.email ?? '').trim().toLowerCase(),
      projectKey: (_dto.projectKey ?? '').trim(),
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
