import { Field, ObjectType } from '@nestjs/graphql'
import { Performance } from '../../performance/models/performance.model'
import { Workout } from '../../workout/models/workout.model'
import { BaseModel } from '../../__infrastructure__/graphql/base.model'

@ObjectType()
export class Session extends BaseModel {
  @Field(() => [Performance])
  performances: Performance[]

  @Field(() => Workout)
  workout: Workout
}
