import { registerEnumType } from '@nestjs/graphql'

export enum WeekDays {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

registerEnumType(WeekDays, {
  name: 'WeekDays',
})
