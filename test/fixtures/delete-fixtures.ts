import { Connection } from 'typeorm'
import { Exercise } from '../../src/exercise/entities/exercise.entity'
import { Workout } from '../../src/workout/entities/workout.entity'
import { Program } from '../../src/program/entities/program.entity'
import { Athlete } from '../../src/athlete/entities/athlete.entity'
import { ExerciseTemplate } from '../../src/exercise/entities/exercise-template.entity'
import { Biometrics } from '../../src/biometrics/entities/biometrics.entity'

export async function deleteFixtures(connection: Connection) {
  const entities = [
    ExerciseTemplate,
    Exercise,
    Workout,
    Program,
    Biometrics,
    Athlete,
  ]
  for (const entity of entities)
    await connection.createQueryBuilder().delete().from(entity).execute()
}
