import { TObjectValueError } from 'src/templates/context/error/domain/value-object.error';
import { IExternalValidators } from 'src/templates/context/domain/validator';

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
