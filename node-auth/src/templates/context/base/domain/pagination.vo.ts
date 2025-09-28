import { InvalidValueObjectException } from '../../error/domain/value-object.error';
import { Either, Left, Right } from '../../error/others/either';
import { NaturalNumber } from './natural.number.vo';

type TPagination = {
  limit: number;
  offset?: number;
  lastId?: Id;
};

export class Pagination {
  private constructor(private readonly pagination: TPagination) {}
  /**
   * [ OBS ] : This function don't follow SRP, validation must to be centralized in one section.
   *
   * Future improvement:
   *
   * createOffsetPagination [method]
   * createLastIdPagination [method]
   *
   * OffsetPaginationValidation [class]
   * LastIdPaginationValidation [class]
   *
   *
   * @param pagination
   * @returns Pagination Instance
   */
  public static create(
    pagination: TPagination,
  ): Either<InvalidValueObjectException, Pagination> {
    if (pagination.offset && pagination.lastId)
      return Left.create(
        new InvalidValueObjectException('Invalid Pagination.', [
          {
            type: 'Invalid Type Pagination',
            message: 'You should choose offset or lastId type pagination.',
          },
        ]),
      );

    const naturalNumberLimitOrError = NaturalNumber.create(pagination.limit);
    if (naturalNumberLimitOrError.isLeft())
      return Left.create(
        new InvalidValueObjectException(
          'Invalid Number for offset or limit',
          naturalNumberLimitOrError.value.errors,
        ),
      );

    if (naturalNumberLimitOrError.value.get() > 50) {
      return Left.create(
        new InvalidValueObjectException('Invalid Number limit', [
          {
            type: 'Limit Exceeded',
            message: 'Limit cannot be greater than 50',
          },
        ]),
      );
    }
    if (pagination.offset) {
      const naturalNumberOffsetOrError = NaturalNumber.create(
        pagination.offset,
      );
      if (naturalNumberOffsetOrError.isLeft())
        return Left.create(
          new InvalidValueObjectException(
            'Invalid Number for offset or limit',
            naturalNumberOffsetOrError.value.errors,
          ),
        );
      if (naturalNumberOffsetOrError.value.get() < 5)
        return Left.create(
          new InvalidValueObjectException('Invalid Number for offset', [
            {
              type: 'Offset Minimum Required',
              message: 'Offset cannot be less than 5',
            },
          ]),
        );
    }

    return Right.create(new Pagination(pagination));
  }

  public getPagination(): TPagination {
    return { ...this.pagination };
  }
}
