import * as Faker from 'faker'

export function authCredentialsInputDataBuilder(authCredentialsInput = {}) {
  const template = {
    email: Faker.internet.email(),
    password: 'qwerty',
  }
  return { ...template, ...authCredentialsInput }
}
