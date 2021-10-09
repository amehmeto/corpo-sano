import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ExerciseTemplate {
  @Field(() => ID)
  id: string

  @Field()
  title: string
}
