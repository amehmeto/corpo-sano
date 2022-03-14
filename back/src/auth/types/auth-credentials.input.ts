import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AuthCredentialsInput {
  @Field()
  email: string

  @Field()
  password: string
}
