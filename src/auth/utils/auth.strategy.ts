import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){
    async canActivate(ctx: ExecutionContext){
        const res = (await super.canActivate(ctx)) as boolean
        const request = ctx.switchToHttp().getRequest()
        await super.logIn(request)
        return res;
    } 
}


@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(ctx: ExecutionContext){
        const req = ctx.switchToHttp().getRequest();
        return req.isAuthenticated()
    }
}