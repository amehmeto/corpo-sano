import { Field, ID, InputType } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class FillWorkoutWithExercisesInput {
  @IsUUID()
  @Field(() => ID)
  workoutId: string

  @Field(() => [ID])
  exercisesId: string[]
}
