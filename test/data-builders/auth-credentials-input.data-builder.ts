import * as Faker from 'faker'
import { athleteDataBuilder } from './athlete.data-builder'
import * as Bcrypt from 'bcrypt'

export function authCredentialsInputDataBuilder(authCredentialsInput = {}) {
  const salt = Bcrypt.genSalt()
  // const password =
  //   authCredentialsInput.password || Faker.random.alphaNumeric(16)
  // const hashedPassword = Bcrypt.hash()
  const template = {
    email: Faker.internet.email(),
    password: Faker.random.alphaNumeric(16),
  }
  return { ...template, ...authCredentialsInput }
}
