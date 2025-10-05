import { Response, Request } from 'express';
import { UserServiceFacade } from '../../context/user-auth/infra/service/user.service';
import { TRegisterUserDto } from 'src/context/user-auth/application/dto/register.user.dto';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserController {
  constructor(
    @inject(UserServiceFacade)
    private readonly userService: UserServiceFacade,
  ) {}

  register = async (
    req: Request<object, object, TRegisterUserDto>,
    res: Response,
  ) => {
    const authFactor = req.authFactor;
    const id = await this.userService.create(req.body, authFactor);
    if (id.isLeft()) throw id.value;

    return res.status(201).json({
      status: 201,
      message: 'User created.',
      userId: id.value,
    });
  };

  getUsers = async (req: Request, res: Response) => {
    const { offset, limit } = req.pagination.getPagination();

    if (offset === undefined)
      throw new Error('Internal not defined offset error.');

    const usersOrError = await this.userService.findAll({ offset, limit });
    if (usersOrError.isLeft()) throw usersOrError.value;
    return res.status(200).json({
      status: 200,
      offset: offset,
      limit: limit,
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
