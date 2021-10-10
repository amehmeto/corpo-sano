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

const fixtureWorkoutUuid = Faker.datatype.uuid()
const fixtureExercise1Uuid = Faker.datatype.uuid()
const fixtureExercise2Uuid = Faker.datatype.uuid()
const fixtureExercise3Uuid = Faker.datatype.uuid()

async function createWorkoutFilledWithExercises(
  connection: Connection,
  workoutRepository: TypeOrmWorkoutRepository,
  exerciseRepository: TypeOrmExerciseRepository,
) {
  await workoutRepository.insert({
    id: fixtureWorkoutUuid,
    title: 'Mon Workout',
    exercises: [],
  })
  const workout = await workoutRepository.findById(fixtureWorkoutUuid)

  const exercises = [
    {
      id: fixtureExercise1Uuid,
      workout,
      template: new ExerciseTemplate({
        id: '00000000-0000-0000-0000-000000000000',
        title: 'Jumping jacks',
      }),
    },
    {
      id: fixtureExercise2Uuid,
      workout,
      template: new ExerciseTemplate({
        id: '00000000-0000-0000-0000-000000000001',
        title: 'Wall sit',
      }),
    },
    {
      id: fixtureExercise3Uuid,
      workout,
      template: new ExerciseTemplate({
        id: '00000000-0000-0000-0000-000000000002',
        title: 'Push-up',
      }),
    },
  ]
  const savedExercises = []
  for (const exercise of exercises) {
    const savedExercise = await exerciseRepository.create(exercise)
    await exerciseRepository.save(exercise)
    savedExercises.push(savedExercise)
  }

  workout.exercises = savedExercises
  await workoutRepository.save(workout)
}

function exercisesDataBuilder() {
  return [
    new Exercise({
      id: fixtureExercise1Uuid,
      createAt: expect.any(Date),
      template: new ExerciseTemplate({
        id: '00000000-0000-0000-0000-000000000000',
        title: 'Jumping jacks',
      }),
    }),
    new Exercise({
      id: fixtureExercise2Uuid,
      createAt: expect.any(Date),
      template: new ExerciseTemplate({
        id: '00000000-0000-0000-0000-000000000001',
        title: 'Wall sit',
      }),
    }),
    new Exercise({
      id: fixtureExercise3Uuid,
      createAt: expect.any(Date),
      template: new ExerciseTemplate({
        id: '00000000-0000-0000-0000-000000000002',
        title: 'Push-up',
      }),
    }),
  ]
}

describe('TypeOrm Workout Repository', () => {
  let connection: Connection
  let workoutRepository: TypeOrmWorkoutRepository
  let exerciseRepository: TypeOrmExerciseRepository

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
    exerciseRepository = module.get<TypeOrmExerciseRepository>(
      TypeOrmExerciseRepository,
    )

    await execSync('yarn db:seed')
    connection = module.get(Connection)
    await createWorkoutFilledWithExercises(
      connection,
      workoutRepository,
      exerciseRepository,
    )
  })

  afterAll(async () => {
    await workoutRepository.query('DELETE FROM exercise')
    await workoutRepository.query('DELETE FROM workout')
  })

  it('should be defined', () => {
    expect(workoutRepository).toBeDefined()
  })

  it('should find workout by id', async () => {
    const id = fixtureWorkoutUuid
    const expectedWorkout = {
      id,
      title: 'Mon Workout',
      exercises: exercisesDataBuilder(),
      scheduledDays: [] as WeekDays[],
    }

    const foundExercise = await workoutRepository.findById(id)

    expect(foundExercise).toStrictEqual(new Workout(expectedWorkout))
  })

  it("should get workout's exercises", async () => {
    const workoutId = fixtureWorkoutUuid
    const expectedExercises = exercisesDataBuilder()

    const retrievedExercises = await workoutRepository.getExercises(workoutId)

    expect(retrievedExercises).toStrictEqual(expectedExercises)
  })

  it('should schedule workout', async () => {
    const daysOfTheWeek = [WeekDays.MONDAY, WeekDays.FRIDAY]
    const workoutId = fixtureWorkoutUuid

    const scheduledWorkout = await workoutRepository.scheduleWorkout(
      workoutId,
      daysOfTheWeek,
    )

    expect(scheduledWorkout.scheduledDays).toStrictEqual(daysOfTheWeek)
  })
})
