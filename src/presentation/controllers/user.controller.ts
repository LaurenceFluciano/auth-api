import { Response, Request } from 'express';
import { UserServiceFacade } from '../service/user.service';
import { RegisterUserDto } from 'src/context/user/application/dto/register.user.dto';

export class UserController {
  constructor(private readonly userService: UserServiceFacade) {}

  register(req: Request<object, object, RegisterUserDto>, res: Response) {
    const userDtoOrError = RegisterUserDto.create(req.body);

    if (userDtoOrError.isLeft()) {
      return res
        .status(500)
        .json({ message: 'Error handler not implemented.' });
    }

    const id = this.userService.create(userDtoOrError.value);

    return res.status(201).json({
      message: 'User created.',
      userId: id,
    });
  }

  async get(req: Request, res: Response) {
    const { page, limit } = req.pagination;
    const offset = new NaturalNumber(limit.get() * (page.get() - 1));
    const usersOrError = await this.userService.findAll({ offset, limit });
    if (usersOrError.isLeft())
      return res
        .status(500)
        .json({ message: 'Error handler not implemented.' });
    return res.status(200).json(usersOrError.value);
  }

  async getById(req: Request<string | number>, res: Response) {
    const id = req.params;
    const userOrError = await this.userService.findOneById(id);
    if (userOrError.isLeft())
      return res
        .status(500)
        .json({ message: 'Error handler not implemented.' });
    return res.status(200).json(userOrError.value);
  }

  async getUserByCredential(
    req: Request<object, object, object, { email: string }>,
    res: Response,
  ) {
    const { email } = req.query;
    const userOrError = await this.userService.findByCredential(
      email,
      req.projectKey,
    );
    if (userOrError.isLeft())
      return res
        .status(500)
        .json({ message: 'Error handler not implemented.' });

    return res.status(200).json(userOrError.value);
  }
}
