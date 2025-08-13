import { Injectable, BadRequestException, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';


@Injectable()
export class ProjectKeyGuard implements CanActivate
{
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const projectKey = request.headers["x-project-key"] as string;
    
    if (!projectKey)
    {
      throw new BadRequestException('x-project-key header is required');
    }

    request.projectKey = projectKey; 
    
    return true;
  }
} 
