import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from '../../__infrastructure__/graphql/base.model'
import { Session } from '../../session/models/session.model'
import { Exercise } from '../../exercise/models/exercise.model'

@ObjectType()
export class Performance extends BaseModel {
  @Field(() => [Number])
  sets: number[]

  @Field(() => Session)
  session: Session

  @Field(() => Exercise)
  exercise: Exercise
}
