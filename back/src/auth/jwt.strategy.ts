import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import * as env from 'env-var'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'MIIBOwIBAAJBAIK0Zss+Kc0hwJ9DhiS7tTLmTNx3sDJxgX+bzc8XmJscKeZyDKbtrR9qwP5UqrF2oMn596FfxDUsaURc44kobfECAwEAAQJAR9IxmgTym1Gsstc74vtyOiHqokryewV8D07h7KYeqTwrGPoqO5DzBBoUW43dV6n8oC1YBdjj6EPuiT/TqaNRQQIhAMPovmyUed7RPBRiTiWRnUMQW6UgFhdxJ2ZSSR1KOcedAiEAqsulq1k0UhgQEzDzt9duFDSOpzfykOtufD2j/XTEUWUCIQCRdXoN/KAQRKKrL+J+GoP9i2PAUvaUKTvrySToTnhgMQIhAJ+ML426fgK2UcXrs7AoAb/EPQJ+ZAz2sTZESr4I5x91AiBvRlMtGLiArdWNKgdLpvYU7O6F1L5cFR09QnD9jBQURQ==',
    })
  }

  async validate(payload: any) {
    return { athleteId: payload.athleteId }
  }
}
