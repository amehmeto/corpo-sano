import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ExerciseTemplate } from '../../exercise-template/models/exercise-template.model'
import { WeekDays } from '../types/week-days.enum'

@ObjectType()
export class Workout {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field(() => [ExerciseTemplate])
  exercises?: ExerciseTemplate[]

  @Field(() => [String])
  scheduledDays?: WeekDays[]
}
