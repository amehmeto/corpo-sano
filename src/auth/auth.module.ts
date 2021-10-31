import { Module } from '@nestjs/common'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from '../athlete/repositories/typeorm-athlete.repository'
import { JwtModule } from '@nestjs/jwt'
import { EmailGatewayToken } from '../athlete/gateways/email.gateway'
import { InMemoryEmailGateway } from '../athlete/gateways/in-memory-email.gateway'

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmAthleteRepository]),
    //PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'should be an env var',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  providers: [
    { provide: EmailGatewayToken, useClass: InMemoryEmailGateway },
    AuthResolver,
    AuthService,
  ],
})
export class AuthModule {}
