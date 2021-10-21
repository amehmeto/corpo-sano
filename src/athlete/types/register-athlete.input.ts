import { Field, InputType, Int, GraphQLISODateTime } from '@nestjs/graphql'
import { Gender } from './gender.enum'
import { MetricUnit } from './metric-system.enum'
import { WeightUnit } from './weight-unit.enum'
import { WeightGoal } from './weight-goal.enum'

@InputType()
export class RegisterAthleteInput {
  @Field(() => Int)
  height: number

  @Field(() => MetricUnit)
  metricUnit: MetricUnit

  @Field(() => Int)
  weight: number

  @Field(() => WeightUnit)
  weightUnit: WeightUnit

  @Field(() => Gender)
  gender: Gender

  @Field(() => GraphQLISODateTime)
  birthday: Date

  @Field(() => WeightGoal)
  weightGoal: WeightGoal

  @Field()
  email: string

  @Field()
  password: string
}
