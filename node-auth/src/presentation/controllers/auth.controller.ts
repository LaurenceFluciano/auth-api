import { Response, Request } from 'express';
import { inject, injectable } from 'tsyringe';
import { UserAuthUseCase } from 'src/context/user-auth/application/usecases/user.auth.usecase';
import * as userRepository from 'src/context/user-auth/domain/ports/user.repository';
import { UserLoginPasswordStatelessService } from 'src/context/user-auth/infra/service/password.login.service';

@injectable()
export class UserAuthController {
  constructor(
    @inject('IUserRepository') private repo: userRepository.IUserRepository,
  ) {}

  login = async (req: Request, res: Response) => {
    const state = (req.headers['x-state'] as string) ?? undefined;

    if (!state)
      res.status(400).json({
        message:
          "You must define 'x-state' header, to choose your login state.",
        allowValues: ['stateless', 'statefull'],
      });

    const useCase = new UserAuthUseCase(this.repo, req.authFactor);

    if (state === 'stateless') {
      const passwordLogin = new UserLoginPasswordStatelessService(useCase);

      const login = await passwordLogin.login(req.body);

      if (login.isLeft()) throw login.value;

      return res.status(200).json({
        ...login.value,
      });
    }

    return res.status(500).json({
      message: 'Internal server error!',
    });
  };
}
