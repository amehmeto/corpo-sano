import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsUUID } from 'class-validator'

@InputType()
export class ExerciseDetailsInput {
  @IsUUID()
  @Field()
  exerciseId: string

  @IsNumber()
  numberOfSets: number

  @IsNumber()
  numberOfReps: number

  @IsNumber()
  finalRestTime: number

  @IsNumber()
  interSetsRestTime: number
}
