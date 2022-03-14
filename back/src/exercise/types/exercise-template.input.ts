import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class ExerciseTemplateInput {
  @Field(() => ID)
  id: string

  @Field()
  title: string
}
