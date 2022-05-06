import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Workout } from '../entities/workout.entity'
import { TypeOrmWorkoutRepository } from './workout.typeorm.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { TypeOrmExerciseTemplateRepository } from '../../exercise/repositories/type-orm-exercise-template.repository'
import { config } from '../../../config'
import { WeekDays } from '../types/week-days.enum'
import { Exercise } from '../../exercise/entities/exercise.entity'
import { TypeOrmExerciseRepository } from '../../exercise/repositories/type-orm-exercise.repository'
import { exerciseDataBuilder } from '../../exercise/data-builders/exercise.data-builder'
import {
  workoutDataBuilder,
  workoutFixture,
} from '../data-builders/workout.data-builder'
import { TypeOrmAthleteRepository } from '../../athlete/repositories/typeorm-athlete.repository'
import { TypeOrmBiometricsRepository } from '../../biometrics/repositories/typeorm-biometrics.repository'
import { exercisesTemplatesFixture } from '../../exercise/data-builders/exercise-template.data-builder'
import { TypeOrmDailyTaskRepository } from '../../daily-task/repositories/daily-task.typeorm.repository'
import { TypeOrmSessionRepository } from '../../session/repositories/session.typeorm.repository'
import { TypeOrmPerformanceRepository } from '../../performance/repositories/performance.typeorm.repository'
import { programFixture } from '../../program/data-builders/program.data-builder'
import { Connection } from 'typeorm'
import { HardCodedValuesEnum } from '../../../test/fixtures/hard-coded-values.enum'

const orderedExercisesWorkoutFixture = new Workout(workoutDataBuilder())
const unorderedExercisesWorkoutFixture = new Workout(workoutDataBuilder())

const orderedExercisesDates = [
  '2018-09-22T15:00:00',
  '2018-09-22T15:02:00',
  '2018-09-22T15:04:00',
]
const unorderedExercisesDates = [
  '2018-09-22T15:02:00',
  '2018-09-22T15:00:00',
  '2018-09-22T15:04:00',
]

function generateExerciseWithDate(date: string): Exercise {
  return new Exercise(
    exerciseDataBuilder({
      createdAt: new Date(date),
    }),
  )
}

const orderedExercisesFixture = orderedExercisesDates.map((date) =>
  generateExerciseWithDate(date),
)
const unorderedExercisesFixture = unorderedExercisesDates.map((date) =>
  generateExerciseWithDate(date),
)

describe('TypeOrm Workout Repository', () => {
  let workoutRepository: TypeOrmWorkoutRepository
  let exerciseRepository: TypeOrmExerciseRepository
  let exerciseTemplateRepository: TypeOrmExerciseTemplateRepository

  async function generateFixtures() {
    await exerciseTemplateRepository.save(exercisesTemplatesFixture)

    const orderedExercises = await exerciseRepository.save(
      orderedExercisesFixture,
    )
    const unorderedExercises = await exerciseRepository.save(
      unorderedExercisesFixture,
    )

    orderedExercisesWorkoutFixture.exercises = orderedExercises
    unorderedExercisesWorkoutFixture.exercises = unorderedExercises

    await workoutRepository.save([
      orderedExercisesWorkoutFixture,
      unorderedExercisesWorkoutFixture,
    ])
  }

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db),
        TypeOrmModule.forFeature([
          TypeOrmAthleteRepository,
          TypeOrmBiometricsRepository,
          TypeOrmDailyTaskRepository,
          TypeOrmExerciseRepository,
          TypeOrmExerciseTemplateRepository,
          TypeOrmProgramRepository,
          TypeOrmWorkoutRepository,
          TypeOrmSessionRepository,
          TypeOrmPerformanceRepository,
        ]),
      ],
    }).compile()

    workoutRepository = module.get<TypeOrmWorkoutRepository>(
      TypeOrmWorkoutRepository,
    )
    exerciseRepository = module.get<TypeOrmExerciseRepository>(
      TypeOrmExerciseRepository,
    )
    exerciseTemplateRepository = module.get<TypeOrmExerciseTemplateRepository>(
      TypeOrmExerciseTemplateRepository,
    )

    await generateFixtures()
  })

  afterAll(async () => {
    await workoutRepository.query('DELETE FROM exercise')
    await workoutRepository.query('DELETE FROM workout')
  })

  it('should be defined', () => {
    expect(workoutRepository).toBeDefined()
  })

  it('should find workout by id', async () => {
    const expectedWorkoutExercises =
      orderedExercisesWorkoutFixture.exercises.map((exercise) => {
        return new Exercise({
          ...exercise,
          version: expect.any(Number),
          updatedAt: expect.any(Date),
        })
      })
    const expectedWorkout = new Workout({
      ...orderedExercisesWorkoutFixture,
      exercises: expectedWorkoutExercises,
      sessions: [],
    })

    const foundExercise = await workoutRepository.findById(
      orderedExercisesWorkoutFixture.id,
    )

    expect(foundExercise).toStrictEqual(expectedWorkout)
  })

  it('should find workout by program id', async () => {
    const expectedWorkout = workoutDataBuilder({
      id: HardCodedValuesEnum.workoutId,
      title: 'Leg Workout',
      programId: programFixture.id
    })

    const programId = programFixture.id

    const [receivedWorkout] = await workoutRepository.findByProgramId(programId)

    expect(receivedWorkout.id).toStrictEqual(expectedWorkout.id)
  })

  it.each([
    [orderedExercisesWorkoutFixture, orderedExercisesFixture],
    [
      unorderedExercisesWorkoutFixture,
      [
        unorderedExercisesFixture[1],
        unorderedExercisesFixture[0],
        unorderedExercisesFixture[2],
      ],
    ],
  ])(
    "should get workout's exercises by creation date",
    async (workoutFixture, exercises) => {
      const expectedExercises = exercises.map((exercise) => {
        return new Exercise({
          ...exercise,
          version: expect.any(Number),
          updatedAt: expect.any(Date),
        })
      })

      const retrievedWorkout = await workoutRepository.findById(
        workoutFixture.id,
      )

      expect(retrievedWorkout.exercises).toStrictEqual(expectedExercises)
    },
  )

  it('should schedule workout', async () => {
    const daysOfTheWeek = [WeekDays.MONDAY, WeekDays.FRIDAY]

    const scheduledWorkout = await workoutRepository.scheduleWorkout(
      orderedExercisesWorkoutFixture.id,
      daysOfTheWeek,
    )

    expect(scheduledWorkout.scheduledDays).toStrictEqual(daysOfTheWeek)
  })

  it('should update a workout', async () => {
    const newWorkout = workoutDataBuilder({
      id: workoutFixture.id,
      title: 'Abs session',
      exercises: [
        new Exercise(exerciseDataBuilder()),
        new Exercise(exerciseDataBuilder()),
      ],
    })

    const updatedWorkout = await workoutRepository.save(newWorkout)

    expect(updatedWorkout).toStrictEqual(newWorkout)
    expect(updatedWorkout).not.toStrictEqual(workoutFixture)
    expect(updatedWorkout.id).toStrictEqual(workoutFixture.id)
  })
})
