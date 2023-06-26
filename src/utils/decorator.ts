import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { AuthenticatedRequest } from "./types";

export const AuthUser = createParamDecorator((_:unknown, ctx: ExecutionContext)=> {
    const req = <AuthenticatedRequest>ctx.switchToHttp().getRequest()
    return req.user
})