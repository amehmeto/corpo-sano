import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Workout {
  @Field(() => ID)
  id: string

  @Field()
  title: string
}
