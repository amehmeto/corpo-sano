import { Field, ID, InputType } from '@nestjs/graphql'
import { IsEnum, IsUUID } from 'class-validator'
import { WeekDays } from './week-days.enum'

@InputType()
export class ScheduleWorkoutInput {
  @IsUUID()
  @Field(() => ID)
  workoutId: string

  @IsEnum(WeekDays)
  @Field(() => [WeekDays])
  daysOfTheWeek: WeekDays[]
}
