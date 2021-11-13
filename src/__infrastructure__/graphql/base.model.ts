import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Workout } from '../../workout/models/workout.model'
import { ExerciseTemplate } from '../../exercise/models/exercise-template.model'

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
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field()
  deletedAt: Date | null

  @Field(() => Workout)
  workout: Workout
}
