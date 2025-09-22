import { TObjectValueError } from 'src/error/value-object.error';
import { IExternalValidators } from 'src/user/domain/validations/validator';

export class FakeValidator implements IExternalValidators {
  runValidations(field: PrimitiveType): TObjectValueError[] {
    const errors: TObjectValueError[] = [
      {
        message: 'Fake error in ' + field,
        type: 'Fake',
      },
    ];

    return errors;
  }
}
