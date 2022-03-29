import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.headers['access-token'];

        if (Boolean(token)) {
            if(String(token) === "meegu") return true;
            else throw new UnauthorizedException('You have no access to this resource');
        }
        throw new UnauthorizedException('You have no access to this resource');
    }
}
