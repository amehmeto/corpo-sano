import { Field, ID, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class ExerciseInput {
  @IsUUID()
  @Field(() => ID)
  id: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  title: string
}
