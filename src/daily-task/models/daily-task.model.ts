import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DailyTask {
  @Field(() => ID)
  id: string

  @Field()
  description: string
}
