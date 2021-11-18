import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ExerciseTemplate } from './exercise-template.model'
import { Workout } from '../../workout/models/workout.model'

@ObjectType()
export class Exercise {
  @Field(() => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field({ nullable: true })
  deletedAt: Date | null

  @Field()
  version: number

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
}
