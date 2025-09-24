import { TObjectValueError } from 'src/share/error/domain/value-object.error';
import { IExternalValidators } from 'src/templates/context/base/domain/validator';

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
