import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { DomainException } from 'src/user/domain/error/domain.exception';
import { DomainErrorType } from 'src/user/domain/error/domain.exception.enum';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let httpException;

    switch (exception.typeStatus) {
      case DomainErrorType.INVALID_VALUE:
        httpException = new BadRequestException(exception.message);
        break;

      case DomainErrorType.FORBIDDEN_VALUE:
        httpException = new ForbiddenException(exception.message)
        break;

      
      default:
        console.warn('[ WARN ] Type error not defined in DOMAIN:', exception);
        httpException = new InternalServerErrorException("Internal server error");
        break;
    }

    response
      .status(httpException.getStatus())
      .json(httpException.getResponse());
  }
}
