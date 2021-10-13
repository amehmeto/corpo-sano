import { Field, ID, InputType } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class ExerciseDetailsInput {
  @IsUUID()
  @Field(() => ID)
  exerciseId: string

  @Field()
  numberOfSets: number

  @Field()
  numberOfReps: number

  @Field()
  finalRestTime: number

  @Field()
  interSetsRestTime: number
}
