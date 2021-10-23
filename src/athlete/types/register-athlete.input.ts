import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql'
import { Gender } from './gender.enum'
import { UnitSystem } from './metric-system.enum'
import { WeightGoal } from './weight-goal.enum'

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
