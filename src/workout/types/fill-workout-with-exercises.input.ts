import { Field, ID, InputType } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class FillWorkoutWithExercisesInput {
  @IsUUID()
  @Field(() => ID)
  workoutId: string

  @IsUUID()
  @Field(() => [ID])
  exercisesId: string[]
}
