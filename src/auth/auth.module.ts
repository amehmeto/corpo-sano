import { Module } from '@nestjs/common'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from '../athlete/repositories/typeorm-athlete.repository'
import { JwtModule } from '@nestjs/jwt'
import { EmailGatewayToken } from './gateways/email.gateway'
import { InMemoryEmailGateway } from './gateways/in-memory-email.gateway'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmAthleteRepository]),
    JwtModule.register({
      secret: 'should be an env var',
      signOptions: { expiresIn: 3600 },
    }),
    PassportModule,
  ],
  providers: [
    { provide: EmailGatewayToken, useClass: InMemoryEmailGateway },
    JwtStrategy,
    AuthResolver,
    AuthService,
  ],
})
export class AuthModule {}
