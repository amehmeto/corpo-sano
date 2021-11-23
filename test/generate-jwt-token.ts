import { INestApplication } from '@nestjs/common'
import { AccessToken } from '../src/auth/types/access-token.type'
import { authCredentialsInputDataBuilder } from './data-builders/auth-credentials-input.data-builder'
import { athleteFixture } from './fixtures/generate-fixtures'
import * as request from 'supertest'

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
