import { Field, ObjectType } from '@nestjs/graphql'
import { ExerciseTemplate } from './exercise-template.model'
import { Workout } from '../../workout/models/workout.model'
import { BaseModel } from '../../__infrastructure__/graphql/base.model'
import { Performance } from '../../performance/models/performance.model'

@ObjectType()
export class Exercise extends BaseModel {
  @Field()
  template: ExerciseTemplate

  @Field()
  numberOfSets: number

  @Field()
  numberOfReps: number

  @Field()
  finalRestTime: number

  @Field()
  interSetsRestTime: number

  @Field()
  position: number

  @Field(() => Workout)
  workout: Workout

  @Field(() => Performance)
  performances: Performance[]
}
