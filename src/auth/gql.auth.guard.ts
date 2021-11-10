import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { Context } from 'vm'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }

  handleRequest(err: any, user: any, info: any, ctx: Context) {
    console.log({ err, user, info })
    return super.handleRequest(err, user, info, ctx)
  }
}
