import { Field, ID, InputType } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class FillWorkoutWithExercisesInput {
  @IsUUID()
  @Field((type) => ID)
  workoutId: string

  @Field((type) => [ID])
  exercisesId: string[]
}
