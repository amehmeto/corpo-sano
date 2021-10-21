import { Field, GraphQLISODateTime, ID, Int, ObjectType } from '@nestjs/graphql'
import { Gender } from '../types/gender.enum'
import { MetricUnit } from '../types/metric-system.enum'
import { WeightUnit } from '../types/weight-unit.enum'
import { WeightGoal } from '../types/weight-goal.enum'

@ObjectType()
export class Athlete {
  @Field(() => ID)
  id: string

  @Field(() => Int)
  height: number

  @Field(() => String)
  metricUnit: MetricUnit

  @Field(() => Int)
  weight: number

  @Field(() => String)
  weightUnit: WeightUnit

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
