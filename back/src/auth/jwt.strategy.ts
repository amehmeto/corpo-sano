import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'MIIBOwIBAAJBAIK0Zss+Kc0hwJ9DhiS7tTLmTNx3sDJxgX+bzc8XmJscKeZyDKbtrR9' +
        'qwP5UqrF2oMn596FfxDUsaURc44kobfECAwEAAQJAR9IxmgTym1Gsstc74vtyOiHqok' +
        'ryewV8D07h7KYeqTwrGPoqO5DzBBoUW43dV6n8oC1YBdjj6EPuiT/TqaNRQQIhAMPov' +
        'myUed7RPBRiTiWRnUMQW6UgFhdxJ2ZSSR1KOcedAiEAqsulq1k0UhgQEzDzt9duFDSO' +
        'pzfykOtufD2j/XTEUWUCIQCRdXoN/KAQRKKrL+J+GoP9i2PAUvaUKTvrySToTnhgMQI' +
        'hAJ+ML426fgK2UcXrs7AoAb/EPQJ+ZAz2sTZESr4I5x91AiBvRlMtGLiArdWNKgdLpv' +
        'YU7O6F1L5cFR09QnD9jBQURQ==',
    })
  }

  async validate(payload: any) {
    return { athleteId: payload.athleteId }
  }
}
