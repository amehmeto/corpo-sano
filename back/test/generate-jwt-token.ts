import { INestApplication } from '@nestjs/common'
import { AccessToken } from '../src/auth/types/access-token.type'
import { authCredentialsInputDataBuilder } from '../src/auth/data-builders/auth-credentials-input.data-builder'
import * as request from 'supertest'
import { athleteFixture } from '../src/athlete/data-builders/athlete.data-builder'

export async function generateJwtToken(app: INestApplication) {
  let token: AccessToken
  const signInQuery = {
    query: `query SignIn($payload: AuthCredentialsInput!) {
          signIn(payload: $payload) {
            token
          }
        }`,
    variables: {
      payload: authCredentialsInputDataBuilder({
        email: athleteFixture.email,
      }),
    },
  }
  await request(app.getHttpServer())
    .post('/graphql')
    .send(signInQuery)
    .expect((res) => {
      token = res.body.data.signIn
    })
  return token
}
