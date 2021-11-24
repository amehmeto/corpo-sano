import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql'
import { Gender } from '../../biometrics/types/gender.enum'
import { UnitSystem } from '../../biometrics/types/metric-system.enum'
import { WeightGoal } from '../../biometrics/types/weight-goal.enum'
import { Biometrics } from '../../biometrics/models/biometrics.model'

@InputType()
export class RegisterAthleteInput {
  @Field(() => String)
  name: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  biometrics: Biometrics
}
