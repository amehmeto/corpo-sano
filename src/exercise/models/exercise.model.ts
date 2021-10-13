import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ExerciseTemplate } from './exercise-template.model'

@ObjectType()
export class Exercise {
  @Field(() => ID)
  id: string

  @Field()
  template: ExerciseTemplate

  @Field()
  numberOfSets: number

  @Field()
  numberOfReps: number

  @Field()
  finalRestTime: number

  @Field()
  interSetsRestTime: number
}
