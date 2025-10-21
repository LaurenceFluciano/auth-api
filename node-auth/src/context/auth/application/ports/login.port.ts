import { ApplicationException } from 'src/templates/context/error/application/application.error';
import { Either } from 'src/templates/context/error/others/either';

export interface ILogin<TDto, TResponse> {
  login(dto: TDto): MaybePromise<Either<ApplicationException, TResponse>>;
}
