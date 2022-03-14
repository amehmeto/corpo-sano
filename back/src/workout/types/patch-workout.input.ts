import { Field, InputType } from '@nestjs/graphql'
import { Exercise } from '../../exercise/models/exercise.model'
import { WeekDays } from './week-days.enum'
import { ExerciseInput } from '../../exercise/types/exercise.input'

@InputType()
export class PatchWorkoutInput {
  @Field({ nullable: true })
  title?: string

  @Field(() => [ExerciseInput], { nullable: true })
  exercises?: Exercise[]

  @Field(() => [String], { nullable: true })
  scheduledDays?: WeekDays[]
}
