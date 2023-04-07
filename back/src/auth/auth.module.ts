import { Module } from '@nestjs/common'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from '../athlete/repositories/typeorm-athlete.repository'
import { JwtModule } from '@nestjs/jwt'
import { EmailGatewayToken } from './gateways/email.gateway'
import { InMemoryEmailGateway } from './gateways/in-memory-email.gateway'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { GqlAuthGuard } from './gql.auth.guard'
import { ATHLETE_REPOSITORY } from '../athlete/repositories/athlete-repository.interface'
import * as env from 'env-var'
import { AthleteModule } from '../athlete/athlete.module'

@Module({
  imports: [
    JwtModule.register({
      secret: env.get('JWT_SECRET').required().asString(),
      signOptions: { expiresIn: 3600 * 24 },
    }),
    PassportModule,
    AthleteModule,
  ],
  providers: [
    {
      provide: EmailGatewayToken,
      useClass: InMemoryEmailGateway,
    },
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
    JwtStrategy,
    AuthResolver,
    AuthService,
  ],
})
export class AuthModule {}
