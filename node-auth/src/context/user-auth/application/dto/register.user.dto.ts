import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { DtoFieldApplcationException } from 'src/templates/context/error/application/invalid.dto.error';

export type TRegisterUserDto = {
  name: string;
  email: string;
  projectKey: string;
  authField?: object;
};

export class RegisterUserDto {
  public readonly name: string;
  public readonly email: string;
  public readonly projectKey: string;
  public readonly authField?: object;

  private constructor(
    name: string,
    email: string,
    projectKey: string,
    authField?: object,
  ) {
    this.name = name;
    this.email = email;
    this.projectKey = projectKey;
    this.authField = authField;
  }

  public static create(_dto: {
    name: string | undefined;
    email: string | undefined;
    projectKey: string | undefined;
    authField?: object;
  }): Either<DtoFieldApplcationException, RegisterUserDto> {
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
      return Left.create(new DtoFieldApplcationException(missingFields));

    return Right.create(
      new RegisterUserDto(
        normalized.name,
        normalized.email,
        normalized.projectKey,
        _dto.authField,
      ),
    );
  }
}
