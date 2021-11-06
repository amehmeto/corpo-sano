import { Field, ID, InputType } from '@nestjs/graphql'
import { ExerciseTemplateInput } from './exercise-template.input'

@InputType()
export class ExerciseInput {
  @Field(() => ID)
  id: string

  @Field()
  template: ExerciseTemplateInput

  @Field()
  numberOfSets: number

  @Field()
  numberOfReps: number

  @Field()
  finalRestTime: number

  @Field()
  interSetsRestTime: number

  @Field()
  createAt: Date
}
