import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Exercise } from '../../exercise/models/exercise.model'

@ObjectType()
export class Workout {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field(() => [Exercise])
  exercises?: Exercise[]
}
