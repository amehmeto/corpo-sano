import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Biometrics } from '../../biometrics/models/biometrics.model'

@ObjectType()
export class Athlete {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field()
  email: string

  @Field()
  password: string

  @Field(() => Biometrics)
  biometrics: Biometrics
}
