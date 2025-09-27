import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { ValidatorProjectKey } from '../../../user/domain/validations/projectkey.validator';
import { InvalidProjectKeyException } from '../../../user/domain/errors/projectkey.error';

export class ProjectKey {
  protected constructor(private projectKey: string) {}

  public static create(
    projectKey: string,
  ): Either<InvalidProjectKeyException, ProjectKey> {
    const validator = new ValidatorProjectKey(projectKey);
    if (validator.hasErrors())
      return Left.create(new InvalidProjectKeyException(validator.getErrors()));
    return Right.create(new ProjectKey(projectKey));
  }

  public getValue(): string {
    return this.projectKey;
  }
}
