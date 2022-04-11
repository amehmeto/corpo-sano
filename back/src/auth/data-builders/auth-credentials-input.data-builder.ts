import { faker as Faker } from '@faker-js/faker'
export function authCredentialsInputDataBuilder(authCredentialsInput = {}) {
  const template = {
    email: Faker.internet.email(),
    password: 'qwerty',
  }
  return { ...template, ...authCredentialsInput }
}
