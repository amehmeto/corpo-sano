import { Connection } from 'typeorm'
import { Exercise } from '../../src/exercise/entities/exercise.entity'
import { Workout } from '../../src/workout/entities/workout.entity'
import { Program } from '../../src/program/entities/program.entity'
import { Athlete } from '../../src/athlete/entities/athlete.entity'
import { ExerciseTemplate } from '../../src/exercise/entities/exercise-template.entity'
import { Biometrics } from '../../src/biometrics/entities/biometrics.entity'
import { DailyTask } from '../../src/daily-task/entities/daily-task.entity'

export async function deleteFixtures(connection: Connection) {
  const entities = [
    Exercise,
    ExerciseTemplate,
    Workout,
    Program,
    Athlete,
    Biometrics,
    DailyTask,
  ]
  for (const entity of entities)
    await connection.createQueryBuilder().delete().from(entity).execute()
}
