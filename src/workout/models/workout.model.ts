import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Workout {
  @Field((type) => ID)
  id: string

  @Field()
  title: string
}
