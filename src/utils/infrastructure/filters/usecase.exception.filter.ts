import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException, InternalServerErrorException, ForbiddenException, BadRequestException, ConflictException } from "@nestjs/common";
import { UseCaseException } from "src/user/application/errors/usecase.exception";
import { UseCaseErrorType } from "src/user/application/errors/usecase.exeception.enum";


@Catch(UseCaseException)
export class UseCaseExceptionFilter implements ExceptionFilter {
  catch(exception: UseCaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let httpException;

    switch (exception.typeStatus) {
      case UseCaseErrorType.NOT_FOUND:
        httpException = new NotFoundException(exception.message);
        break;

      case UseCaseErrorType.FORBIDDEN_ERROR:
        httpException = new ForbiddenException(exception.message);
        break;

      case UseCaseErrorType.BAD_REQUEST_ERROR:
        httpException = new BadRequestException(exception.message);
        break;

      case UseCaseErrorType.CONFLICT_ERROR:
        httpException = new ConflictException(exception.message);
        break;

      default:
        console.warn("[ WARN ] Unmapped use case error:", exception);
        httpException = new InternalServerErrorException("Unexpected error in use case layer");
        break;
    }

    response
        .status(httpException.getStatus())
        .json(httpException.getResponse());
  }
}
