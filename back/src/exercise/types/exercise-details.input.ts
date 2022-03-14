import { Field, ID, InputType, Int } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class ExerciseDetailsInput {
  @IsUUID()
  @Field(() => ID)
  exerciseId: string

  @Field(() => Int)
  numberOfSets: number

  @Field(() => Int)
  numberOfReps: number

  @Field(() => Int)
  finalRestTime: number

  @Field(() => Int)
  interSetsRestTime: number
}
