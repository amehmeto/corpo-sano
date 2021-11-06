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
import { TypeOrmExerciseRepository } from '../../exercise/repositories/type-orm-exercise.repository'
import { exerciseDataBuilder } from '../../../test/data-builders/exercise.data-builder'
import { workoutDataBuilder } from '../../../test/data-builders/workout.data-builder'

const orderedExercisesWorkoutFixture = new Workout(workoutDataBuilder())
const unorderedExercisesWorkoutFixture = new Workout(workoutDataBuilder())

const orderedExercisesFixture = [
  new Exercise(
    exerciseDataBuilder({
      createAt: new Date('2018-09-22T15:00:00'),
    }),
  ),
  new Exercise(
    exerciseDataBuilder({
      createAt: new Date('2018-09-22T15:02:00'),
    }),
  ),
  new Exercise(
    exerciseDataBuilder({
      createAt: new Date('2018-09-22T15:04:00'),
    }),
  ),
]

const unorderedExercisesFixture = [
  new Exercise(
    exerciseDataBuilder({
      createAt: new Date('2018-09-22T15:02:00'),
    }),
  ),
  new Exercise(
    exerciseDataBuilder({
      createAt: new Date('2018-09-22T15:00:00'),
    }),
  ),

  new Exercise(
    exerciseDataBuilder({
      createAt: new Date('2018-09-22T15:04:00'),
    }),
  ),
]

describe('TypeOrm Workout Repository', () => {
  let workoutRepository: TypeOrmWorkoutRepository
  let exerciseRepository: TypeOrmExerciseRepository

  async function generateFixtures() {
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
    const expectedWorkout = {
      id: orderedExercisesWorkoutFixture.id,
      title: orderedExercisesWorkoutFixture.title,
      exercises: orderedExercisesFixture,
      scheduledDays: [] as WeekDays[],
    }

    const foundExercise = await workoutRepository.findById(
      orderedExercisesWorkoutFixture.id,
    )

    expect(foundExercise).toStrictEqual(new Workout(expectedWorkout))
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
    "should get workout's exercises by createAt date",
    async (workoutFixture, expectedExercises) => {
      const retrievedExercises = await workoutRepository.getExercises(
        workoutFixture.id,
      )

      expect(retrievedExercises).toStrictEqual(expectedExercises)
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
})
