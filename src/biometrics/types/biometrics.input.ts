import { Field, GraphQLISODateTime, ID, InputType, Int } from '@nestjs/graphql'
import { UnitSystem } from './metric-system.enum'
import { Gender } from './gender.enum'
import { WeightGoal } from './weight-goal.enum'

@InputType()
export class BiometricsInput {
  @Field(() => ID)
  id: string

  @Field(() => Int)
  height: number

  @Field(() => Int)
  bodyFat: number

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
}
