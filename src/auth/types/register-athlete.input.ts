import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql'
import { Gender } from '../../athlete/types/gender.enum'
import { UnitSystem } from '../../athlete/types/metric-system.enum'
import { WeightGoal } from '../../athlete/types/weight-goal.enum'

@InputType()
export class RegisterAthleteInput {
  @Field(() => String)
  name: string

  @Field(() => Int)
  height: number

  @Field(() => String)
  lengthUnit: UnitSystem

  @Field(() => Int)
  weight: number

  @Field(() => String)
  weightUnit: UnitSystem

  @Field(() => String)
  gender: Gender

  @Field(() => GraphQLISODateTime)
  birthday: Date

  @Field(() => String)
  weightGoal: WeightGoal

  @Field()
  email: string

  @Field()
  password: string
}