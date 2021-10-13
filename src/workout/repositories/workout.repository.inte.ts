import { Test } from '@nestjs/testing'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ExerciseTemplate } from '../../exercise/entities/exercise-template.entity'
import { Program } from '../../program/entities/program.entity'
import { Workout } from '../entities/workout.entity'
import { TypeOrmWorkoutRepository } from './typeorm-workout.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { TypeOrmExerciseTemplateRepository } from '../../exercise/repositories/type-orm-exercise-template.repository'
import { config } from '../../../config'
import { execSync } from 'child_process'
import { WeekDays } from '../types/week-days.enum'
import { Exercise } from '../../exercise/entities/exercise.entity'
import * as Faker from 'faker'
import { TypeOrmExerciseRepository } from '../../exercise/repositories/type-orm-exercise.repository'
import { Connection } from 'typeorm'

const workoutFixture = {
  id: Faker.datatype.uuid(),
  title: 'Mon Workout',
  exercises: [] as Exercise[],
}

const exercises = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    title: 'Jumping jacks',
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    title: 'Wall sit',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    title: 'Push-up',
  },
]

const exercisesFixture = exercises.map((exercise) => ({
  id: Faker.datatype.uuid(),
  template: new ExerciseTemplate({ ...exercise }),
  numberOfSets: 0,
  numberOfReps: 0,
  interSetsRestTime: 0,
  finalRestTime: 0,
}))

async function saveExercisesFixture(
  workout: Workout,
  exerciseRepository: TypeOrmExerciseRepository,
) {
  const savedExercises = []
  for (const exercise of exercisesFixture) {
    const hydratedExercise = { ...exercise, workout }
    const savedExercise = await exerciseRepository.create(hydratedExercise)
    await exerciseRepository.save(hydratedExercise)
    savedExercises.push(savedExercise)
  }
  return savedExercises
}

async function createWorkoutFilledWithExercises(connection: Connection) {
  const workoutRepository = await connection.getCustomRepository(
    TypeOrmWorkoutRepository,
  )
  const exerciseRepository = await connection.getCustomRepository(
    TypeOrmExerciseRepository,
  )

  workoutRepository.insert(workoutFixture)
  const workout = await workoutRepository.findById(workoutFixture.id)
  workout.exercises = await saveExercisesFixture(workout, exerciseRepository)
  await workoutRepository.save(workout)
}

function exercisesDataBuilder() {
  return exercisesFixture.map(
    (fixtureExercise) =>
      new Exercise({
        id: fixtureExercise.id,
        createAt: expect.any(Date),
        template: new ExerciseTemplate({
          ...fixtureExercise.template,
        }),
        numberOfSets: 0,
        numberOfReps: 0,
        interSetsRestTime: 0,
        finalRestTime: 0,
      }),
  )
}

describe('TypeOrm Workout Repository', () => {
  let connection: Connection
  let workoutRepository: TypeOrmWorkoutRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([
          TypeOrmWorkoutRepository,
          TypeOrmExerciseTemplateRepository,
          TypeOrmExerciseRepository,
          TypeOrmProgramRepository,
          ExerciseTemplate,
          Program,
        ]),
      ],
    }).compile()

    workoutRepository = module.get<TypeOrmWorkoutRepository>(
      TypeOrmWorkoutRepository,
    )

    await workoutRepository.query('DELETE FROM exercise')
    await workoutRepository.query('DELETE FROM workout')
    await execSync('yarn db:seed')
    connection = module.get(Connection)
    await createWorkoutFilledWithExercises(connection)
  })

  afterAll(async () => {
    await workoutRepository.query('DELETE FROM exercise')
    await workoutRepository.query('DELETE FROM workout')
  })

  it('should be defined', () => {
    expect(workoutRepository).toBeDefined()
  })

  it('should find workout by id', async () => {
    const expectedWorkout = {
      id: workoutFixture.id,
      title: 'Mon Workout',
      exercises: exercisesDataBuilder(),
      scheduledDays: [] as WeekDays[],
    }

    const foundExercise = await workoutRepository.findById(workoutFixture.id)

    expect(foundExercise).toStrictEqual(new Workout(expectedWorkout))
  })

  it("should get workout's exercises", async () => {
    const expectedExercises = exercisesDataBuilder()

    const retrievedExercises = await workoutRepository.getExercises(
      workoutFixture.id,
    )

    expect(retrievedExercises).toStrictEqual(expectedExercises)
  })

  it('should schedule workout', async () => {
    const daysOfTheWeek = [WeekDays.MONDAY, WeekDays.FRIDAY]

    const scheduledWorkout = await workoutRepository.scheduleWorkout(
      workoutFixture.id,
      daysOfTheWeek,
    )

    expect(scheduledWorkout.scheduledDays).toStrictEqual(daysOfTheWeek)
  })
})
