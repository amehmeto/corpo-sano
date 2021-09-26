import { registerEnumType } from '@nestjs/graphql'

export enum WeekDays {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

registerEnumType(WeekDays, {
  name: 'WeekDays',
})
