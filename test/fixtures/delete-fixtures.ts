import { Connection } from 'typeorm'
import { Exercise } from '../../src/exercise/entities/exercise.entity'
import { Workout } from '../../src/workout/entities/workout.entity'
import { Program } from '../../src/program/entities/program.entity'
import { Athlete } from '../../src/athlete/entities/athlete.entity'
import { ExerciseTemplate } from '../../src/exercise/entities/exercise-template.entity'
import { Biometrics } from '../../src/biometrics/entities/biometrics.entity'
import { DailyTask } from '../../src/daily-task/entities/daily-task.entity'
import { Session } from '../../src/session/entities/session.entity'

export async function deleteFixtures(connection: Connection) {
  // The order of deletion is sensitive /!\

  const entities = [
    Exercise,
    ExerciseTemplate,
    Biometrics,
    Athlete,
    Program,
    Workout,
    DailyTask,
    Session,
  ]
  await connection.query('SET FOREIGN_KEY_CHECKS=0')
  for (const entity of entities)
    await connection.createQueryBuilder().delete().from(entity).execute()
}
