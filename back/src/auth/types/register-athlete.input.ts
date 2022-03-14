import { Field, InputType } from '@nestjs/graphql'
import { BiometricsInput } from '../../biometrics/types/biometrics.input'

@InputType()
export class RegisterAthleteInput {
  @Field(() => String)
  name: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  biometrics: BiometricsInput
}
