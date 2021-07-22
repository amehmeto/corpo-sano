import { Field, ID, InputType } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'
import { Exercise } from '../../exercise/types/exercise.type'
import { ExerciseInput } from '../../exercise/types/exercise.input'

@InputType()
export class FillWorkoutWithExercisesInput {
  @IsUUID()
  @Field((type) => ID)
  workoutId: string

  @Field((type) => [ExerciseInput])
  exercises: Exercise[]
}
