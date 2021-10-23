import { Field, GraphQLISODateTime, ID, Int, ObjectType } from '@nestjs/graphql'
import { Gender } from '../types/gender.enum'
import { UnitSystem } from '../types/metric-system.enum'
import { WeightGoal } from '../types/weight-goal.enum'

@ObjectType()
export class Athlete {
  @Field(() => ID)
  id: string

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
