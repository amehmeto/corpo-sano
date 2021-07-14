import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Program {
  @Field((type) => ID)
  id: string

  @Field()
  title: string
}
