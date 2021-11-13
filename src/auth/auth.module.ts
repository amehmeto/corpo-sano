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
      secret:
        'MIIBOwIBAAJBAIK0Zss+Kc0hwJ9DhiS7tTLmTNx3sDJxgX+bzc8XmJscKeZyDKbtrR9' +
        'qwP5UqrF2oMn596FfxDUsaURc44kobfECAwEAAQJAR9IxmgTym1Gsstc74vtyOiHqok' +
        'ryewV8D07h7KYeqTwrGPoqO5DzBBoUW43dV6n8oC1YBdjj6EPuiT/TqaNRQQIhAMPov' +
        'myUed7RPBRiTiWRnUMQW6UgFhdxJ2ZSSR1KOcedAiEAqsulq1k0UhgQEzDzt9duFDSO' +
        'pzfykOtufD2j/XTEUWUCIQCRdXoN/KAQRKKrL+J+GoP9i2PAUvaUKTvrySToTnhgMQI' +
        'hAJ+ML426fgK2UcXrs7AoAb/EPQJ+ZAz2sTZESr4I5x91AiBvRlMtGLiArdWNKgdLpv' +
        'YU7O6F1L5cFR09QnD9jBQURQ==',
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
