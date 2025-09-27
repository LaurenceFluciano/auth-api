import { Response, Request } from 'express';
import { UserServiceFacade } from '../service/user.service';
import { RegisterUserDto } from 'src/context/user/application/dto/register.user.dto';
import { inject, injectable } from 'tsyringe';
import { NaturalNumber } from 'src/templates/context/base/domain/pagination.vo';

@injectable()
export class UserController {
  constructor(
    @inject(UserServiceFacade)
    private readonly userService: UserServiceFacade,
  ) {}

  register = async (
    req: Request<object, object, RegisterUserDto>,
    res: Response,
  ) => {
    const userDtoOrError = RegisterUserDto.create(req.body);

    if (userDtoOrError.isLeft()) throw userDtoOrError.value;
    const id = await this.userService.create(userDtoOrError.value);
    if (id.isLeft()) throw id.value;

    return res.status(201).json({
      message: 'User created.',
      userId: id.value,
    });
  };

  getUsers = async (req: Request, res: Response) => {
    const { page, limit } = req.pagination;
    const offset = new NaturalNumber(limit.get() * (page.get() - 1));
    const usersOrError = await this.userService.findAll({ offset, limit });
    if (usersOrError.isLeft()) throw usersOrError.value;
    return res.status(200).json({
      page: page.get(),
      limit: limit.get(),
      data: usersOrError.value,
    });
  };

  getById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userOrError = await this.userService.findOneById(id);
    if (userOrError.isLeft()) throw userOrError.value;
    return res.status(200).json(userOrError.value);
  };

  getUserByCredential = async (
    req: Request<object, object, object, { email: string }>,
    res: Response,
  ) => {
    const { email } = req.query;
    const userOrError = await this.userService.findByCredential(
      email,
      req.projectKey,
    );
    if (userOrError.isLeft()) throw userOrError.value;
    return res.status(200).json(userOrError.value);
  };
}
