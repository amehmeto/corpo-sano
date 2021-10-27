import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ExerciseTemplate } from './exercise-template.model'
import { Workout } from '../../workout/models/workout.model'

@ObjectType()
export class Exercise {
  @Field(() => ID)
  id: string

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
  createAt: Date

  @Field(() => Workout)
  workout: Workout
}
